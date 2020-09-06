import pytest
from rest_framework.test import APIClient

from core.models import User, UserType


@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db, settings):
    settings.REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"].append(
        "rest_framework.authentication.SessionAuthentication"
    )


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def owner():
    user = User.objects.create(username="Owner", first_name="Owner", user_type=UserType.OWNER)
    client = APIClient()
    client.force_login(user)
    yield user, client


@pytest.fixture
def regular():
    user = User.objects.create(username="Regular", first_name="Regular", user_type=UserType.REGULAR)
    client = APIClient()
    client.force_login(user)
    yield user, client


@pytest.fixture
def admin():
    user = User.objects.create(username="Admin", first_name="Admin", is_staff=True, is_superuser=True)
    client = APIClient()
    client.force_login(user)
    yield user, client
