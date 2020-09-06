import pytest

from tests.factories import RestaurantFactory, OrderFactory
from core.models import Order


def test_getting_order_list_by_regular_user(regular):
    user, client = regular
    for _ in range(3):
        OrderFactory()
    OrderFactory(user=user)

    response = client.get("/orders/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["user"] == user.id


def test_getting_order_list_by_restaurant_owner(owner):
    user, client = owner
    restaurant = RestaurantFactory(owner=user)
    for _ in range(3):
        OrderFactory(restaurant=restaurant)

    response = client.get("/orders/")

    assert response.status_code == 200
    assert len(response.data) == 3
    assert response.data[0]["user"] != user.id


def test_getting_single_order(regular):
    user, client = regular
    order = OrderFactory(user=user)

    response = client.get(f"/orders/{order.id}/")

    assert response.status_code == 200
    assert response.data["user"] == user.id


def test_regular_user_changing_order_properties_not_allowed(regular):
    user, client = regular

    order = OrderFactory(user=user)
    restaurant = RestaurantFactory()
    response = client.patch(f"/orders/{order.id}/", {"restaurant": restaurant.id})

    assert response.status_code == 400
    assert response.data["detail"] == "Only order status can be modified"


@pytest.mark.parametrize(
    "status,next_status,is_allowed",
    [
        (Order.Status.PLACED, Order.Status.CANCELED, True),
        (Order.Status.DELIVERED, Order.Status.RECEIVED, True),
        #
        (Order.Status.CANCELED, Order.Status.PLACED, False),
        (Order.Status.PLACED, Order.Status.PROCESSING, False),
        (Order.Status.PROCESSING, Order.Status.IN_ROUTE, False),
        (Order.Status.IN_ROUTE, Order.Status.DELIVERED, False),
        (Order.Status.RECEIVED, Order.Status.CANCELED, False),
    ],
)
def test_regular_user_status_changes(regular, status, next_status, is_allowed):
    user, client = regular

    order = OrderFactory(status=status, user=user)
    response = client.patch(f"/orders/{order.id}/", {"status": next_status})

    if is_allowed:
        assert response.status_code == 200
        assert response.data["status"] == next_status
    else:
        assert response.status_code == 403
        assert "do not have permission" in response.data["detail"]


@pytest.mark.parametrize(
    "status,next_status,is_allowed",
    [
        (Order.Status.PLACED, Order.Status.PROCESSING, True),
        (Order.Status.PROCESSING, Order.Status.IN_ROUTE, True),
        (Order.Status.IN_ROUTE, Order.Status.DELIVERED, True),
        #
        (Order.Status.PLACED, Order.Status.CANCELED, False),
        (Order.Status.DELIVERED, Order.Status.RECEIVED, False),
        (Order.Status.CANCELED, Order.Status.PLACED, False),
        (Order.Status.RECEIVED, Order.Status.CANCELED, False),
    ],
)
def test_owner_user_status_changes(owner, status, next_status, is_allowed):
    user, client = owner

    restaurant = RestaurantFactory(owner=user)
    order = OrderFactory(status=status, restaurant=restaurant)
    response = client.patch(f"/orders/{order.id}/", {"status": next_status})

    if is_allowed:
        assert response.status_code == 200
        assert response.data["status"] == next_status
    else:
        assert response.status_code == 403
        assert "do not have permission" in response.data["detail"]
