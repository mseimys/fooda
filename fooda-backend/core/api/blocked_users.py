from rest_framework import serializers, viewsets
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
