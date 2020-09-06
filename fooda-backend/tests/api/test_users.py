from rest_framework.test import APIClient


def test_users_me_as_anonymous():
    client = APIClient()
    response = client.get("/users/me/")
    assert response.status_code == 401


def test_users_me(owner):
    user, client = owner

    response = client.get("/users/me/")

    assert response.status_code == 200
    assert response.data["id"] == user.id
    assert response.data["username"] == user.username


def test_users_list_by_non_admin_users(owner, regular):
    user, client = regular

    response = client.get("/users/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["username"] == user.username


def test_users_list_by_admin(admin, owner, regular):
    user, client = admin

    response = client.get("/users/")

    assert response.status_code == 200
    assert len(response.data) == 3


def test_user_signup_as_anonymous():
    client = APIClient()
    user = {
        "username": "test-username",
        "password": "secret",
        "first_name": "Test User",
        "last_name": "Trump",
        "email": "tester@example.com",
        "user_type": "REGULAR",
    }

    response = client.post("/signup/", user)

    password = user.pop("password")
    assert response.status_code == 201
    assert response.data == user

    # Try getting a token for newly created user
    response = client.post("/token/", {"username": user["username"], "password": password})

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data
