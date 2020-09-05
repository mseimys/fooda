from tests.factories import RestaurantFactory, MealFactory


def test_meal_listing(regular):
    user, client = regular
    for _ in range(3):
        MealFactory()

    response = client.get("/meals/")

    assert response.status_code == 200
    assert len(response.data) == 3


def test_meal_filtering_by_restaurant(regular):
    user, client = regular
    for _ in range(3):
        MealFactory()

    meal = MealFactory()

    response = client.get(f"/meals/?restaurant={meal.restaurant.id}")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["name"] == meal.name


def test_add_meal_by_restaurant_owner(owner):
    user, client = owner
    restaurant = RestaurantFactory(owner=user)

    response = client.post("/meals/", {"name": "Apple", "price": 1984, "restaurant": restaurant.id})

    assert response.status_code == 201
    assert response.data["name"] == "Apple"


def test_modify_meal_by_restaurant_owner(owner):
    user, client = owner
    restaurant = RestaurantFactory(owner=user)
    meal = MealFactory(restaurant=restaurant, price=111)

    response = client.put(f"/meals/{meal.id}/", {"name": "Apple", "price": 222, "restaurant": restaurant.id})

    assert response.status_code == 200
    assert response.data["price"] == 222


def test_modify_meal_forbidden_by_regular_user(regular):
    user, client = regular
    meal = MealFactory(price=111)

    response = client.put(f"/meals/{meal.id}/", {"name": "Apple", "price": 222, "restaurant": meal.restaurant.id})

    assert response.status_code == 403
