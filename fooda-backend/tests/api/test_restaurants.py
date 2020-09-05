from tests.factories import RestaurantFactory, MealFactory


def test_restaurant_list(regular):
    user, client = regular
    restaurant = RestaurantFactory()
    meal = MealFactory(restaurant=restaurant)

    response = client.get("/restaurants/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["name"] == restaurant.name
    assert len(response.data[0]["meals"]) == 1
    assert response.data[0]["meals"][0]["name"] == meal.name


def test_restaurant_cannot_be_created_by_a_regular_user(regular):
    user, client = regular

    response = client.post("/restaurants/", {"name": "My Restaurant"})

    assert response.status_code == 403
    assert response.data["detail"] == "You must be an owner to create a restaurant"


def test_restaurant_create_by_owner_user(owner):
    user, client = owner

    response = client.post("/restaurants/", {"name": "My Restaurant"})

    assert response.status_code == 201
    assert response.data["name"] == "My Restaurant"
    assert response.data["owner"] == user.id


def test_restaurant_cannot_be_modified_by_a_regular_user(regular):
    user, client = regular
    restaurant = RestaurantFactory()

    response = client.put(f"/restaurants/{restaurant.id}/", {"name": "Test"})

    assert response.status_code == 403


def test_restaurant_can_be_modified_by_its_owner(client):
    restaurant = RestaurantFactory()
    client.force_login(restaurant.owner)

    response = client.put(f"/restaurants/{restaurant.id}/", {"name": "Test"})

    assert response.status_code == 200
    assert response.data["name"] == "Test"
