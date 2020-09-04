from django.db import models
from django.core.validators import MinValueValidator

from core.models import Restaurant


class Meal(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="meals")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.FloatField(validators=[MinValueValidator(0.0)])

    def __str__(self):
        return f"{self.id} {self.name} [Restaurant {self.restaurant_id}]"
