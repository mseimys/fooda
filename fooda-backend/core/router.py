from rest_framework import routers

from core.api.users import UserViewSet
from core.api.restaurants import RestaurantViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"restaurants", RestaurantViewSet)
