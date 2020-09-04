from rest_framework import serializers, viewsets, exceptions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

from core.models import Meal, Restaurant


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"


class IsOwnerOfTheRestaurant(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.restaurant.owner == request.user


class MealViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated & IsOwnerOfTheRestaurant]
    queryset = Meal.objects.none()
    serializer_class = MealSerializer

    def perform_create(self, serializer):
        restaurant_id = serializer.initial_data.get("restaurant")
        if not Restaurant.objects.filter(owner=self.request.user, id=restaurant_id).exists():
            raise exceptions.PermissionDenied("You must be the owner to create a meal in this restaurant")
        serializer.save()

    def get_queryset(self):
        queryset = Meal.objects.select_related("restaurant")
        restaurant = self.request.query_params.get("restaurant", None)
        if restaurant is not None:
            queryset = queryset.filter(restaurant=restaurant)
        return queryset
