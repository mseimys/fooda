from django.db import models

from core.models import User, Restaurant


class BlockedUser(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="blocked_users")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blocked_restaurants")

    def __str__(self):
        return f"User={self.user} Restaurant={self.restaurant}"
