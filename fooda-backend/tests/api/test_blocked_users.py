from tests.factories import UserFactory, RestaurantFactory, BlockedUserFactory
from core.models import BlockedUser


def test_blocked_users_are_visible_only_by_restaurant_owner(owner):
    owner_user, client = owner
    regular_user = UserFactory()
    restaurant = RestaurantFactory(owner=owner_user)
    other_restaurant = RestaurantFactory()
    BlockedUserFactory(user=regular_user, restaurant=restaurant)
    BlockedUserFactory(user=regular_user, restaurant=other_restaurant)

    response = client.get("/blocked_users/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["restaurant"] == restaurant.id


def test_user_unblocking_by_owner(owner):
    owner_user, client = owner
    regular_user = UserFactory()
    restaurant = RestaurantFactory(owner=owner_user)
    blocked_user = BlockedUserFactory(user=regular_user, restaurant=restaurant)

    response = client.delete(f"/blocked_users/{blocked_user.id}/")

    assert response.status_code == 204
    assert not BlockedUser.objects.exists()


def test_user_cannot_unblock_by_himself(regular):
    user, client = regular
    blocked_user = BlockedUserFactory(user=user)

    response = client.delete(f"/blocked_users/{blocked_user.id}/")

    assert response.status_code == 404
    assert BlockedUser.objects.exists()
