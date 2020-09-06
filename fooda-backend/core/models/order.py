from django.db import models

from core.models import User, Restaurant, Meal


class OrderItem(models.Model):
    order = models.ForeignKey("core.Order", on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()


class Order(models.Model):
    class Status(models.TextChoices):
        PLACED = "PLACED"
        CANCELED = "CANCELED"
        PROCESSING = "PROCESSING"
        IN_ROUTE = "IN_ROUTE"
        DELIVERED = "DELIVERED"
        RECEIVED = "RECEIVED"

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="orders")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PLACED)
    items = models.ManyToManyField(Meal, through=OrderItem)

    class Meta:
        ordering = ["-updated"]

    def __str__(self):
        return f"Order {self.id} [{self.status}] by {self.user}"


class OrderHistoryItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="history_items")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="history_items")
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=255)

    class Meta:
        ordering = ["-created"]
