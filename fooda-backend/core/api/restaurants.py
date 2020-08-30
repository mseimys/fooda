from rest_framework import serializers, viewsets, exceptions

from core.models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = "__all__"


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.none()
    serializer_class = RestaurantSerializer

    def perform_create(self, serializer):
        if self.request.user.is_owner:
            raise exceptions.PermissionDenied("You must be owner to create a restaurant")
        serializer.save(owner=self.request.user)

    def check_object_permissions(self, request, obj):
        if request.method in ["PATCH", "DELETE", "PUT"] and obj.owner != request.user and not request.user.is_superuser:
            raise exceptions.PermissionDenied()

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        owner = self.request.query_params.get("owner", None)
        if owner is not None:
            queryset = queryset.filter(owner=owner)
        return queryset
