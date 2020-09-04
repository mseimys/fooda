from rest_framework import routers

from core.api.users import UserViewSet
from core.api.restaurants import RestaurantViewSet
from core.api.blocked_users import BlockedUserViewSet
from core.api.meals import MealViewSet
from core.api.orders import OrderHistoryViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"restaurants", RestaurantViewSet)
router.register(r"meals", MealViewSet)
router.register(r"blocked_users", BlockedUserViewSet)
router.register(r"orders", OrderViewSet)
router.register(r"order_history", OrderHistoryViewSet)
