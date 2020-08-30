from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Type(models.TextChoices):
        REGULAR = "REGULAR"
        OWNER = "OWNER"

    user_type = models.CharField(max_length=10, choices=Type.choices, default=Type.REGULAR)

    @property
    def is_regular(self):
        return self.is_superuser or self.user_type == Type.REGULAR

    @property
    def is_owner(self):
        return self.is_superuser or self.user_type == Type.OWNER
