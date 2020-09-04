from django.db import models
from django.contrib.auth.models import AbstractUser


class UserType(models.TextChoices):
    REGULAR = "REGULAR"
    OWNER = "OWNER"


class User(AbstractUser):
    user_type = models.CharField(max_length=10, choices=UserType.choices, default=UserType.REGULAR)

    @property
    def is_regular(self):
        return self.is_superuser or self.user_type == UserType.REGULAR

    @property
    def is_owner(self):
        return self.is_superuser or self.user_type == UserType.OWNER
