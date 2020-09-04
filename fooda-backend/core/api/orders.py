from rest_framework import serializers, viewsets

from core.models import Order, OrderHistoryItem

from .meals import MealSerializer


class OrderSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class OrderHistoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistoryItem
        fields = "__all__"


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().select_related("restaurant", "user")
    serializer_class = OrderSerializer


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistoryItem.objects.all().select_related("order", "user")
    serializer_class = OrderHistoryItemSerializer
