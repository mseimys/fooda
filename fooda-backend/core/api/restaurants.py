from rest_framework import serializers, viewsets, exceptions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

from core.models import Restaurant
from .meals import MealSerializer


class RestaurantSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = "__all__"
        read_only_fields = ("owner",)


class IsOwnerOfTheRestaurant(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


class RestaurantViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated & IsOwnerOfTheRestaurant]
    queryset = Restaurant.objects.none()
    serializer_class = RestaurantSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_owner:
            raise exceptions.PermissionDenied("You must be an owner to create a restaurant")
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        owner = self.request.query_params.get("owner", None)
        if owner is not None:
            queryset = queryset.filter(owner=owner)
        return queryset
