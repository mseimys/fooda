from rest_framework import serializers, viewsets, exceptions
from rest_framework.permissions import IsAuthenticated

from core.models import BlockedUser


class BlockedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedUser
        fields = "__all__"


class BlockedUserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = BlockedUser.objects.select_related("restaurant", "user")
    serializer_class = BlockedUserSerializer

    def perform_create(self, serializer):
        user = serializer.validated_data.get("user")
        restaurant = serializer.validated_data.get("restaurant")
        if restaurant.owner != self.request.user:
            raise exceptions.PermissionDenied()
        if BlockedUser.objects.filter(user=user, restaurant=restaurant).exists():
            return
        serializer.save()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(restaurant__owner=self.request.user)
