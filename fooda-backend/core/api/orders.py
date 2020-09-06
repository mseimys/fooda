from rest_framework import serializers, viewsets, exceptions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

from core.models import Order, OrderHistoryItem, OrderItem, UserType
from .meals import MealSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    meal = MealSerializer()

    class Meta:
        model = OrderItem
        exclude = ("order",)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source="orderitem_set", many=True)

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        if validated_data.get("status") != Order.Status.PLACED:
            raise exceptions.ValidationError("Order must be created with PLACED status")

        restaurant = validated_data.get("restaurant")
        order_items_to_create = []
        for order_item in validated_data.pop("orderitem_set"):
            meal = order_item.get("meal")
            if order_item.get("count") <= 0:
                continue
            if meal.get("restaurant") != restaurant:
                raise exceptions.ValidationError(f"{meal.get('name')} belongs to another restaurant")
            order_item = OrderItem(meal_id=meal.get("id"), count=order_item.get("count"))
            order_items_to_create.append(order_item)

        if len(order_items_to_create) == 0:
            raise exceptions.ValidationError("Order must have at least a single item in order")

        order = Order.objects.create(**validated_data)
        for item in order_items_to_create:
            item.order_id = order.id
        OrderItem.objects.bulk_create(order_items_to_create)
        return order


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Order.objects.select_related("restaurant", "user")
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.user_type == UserType.REGULAR:
            return queryset.filter(user=self.request.user)
        return queryset.filter(restaurant__owner=self.request.user)


class OrderHistoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistoryItem
        fields = "__all__"


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistoryItem.objects.select_related("order", "user")
    serializer_class = OrderHistoryItemSerializer
