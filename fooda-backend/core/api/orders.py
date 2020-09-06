from rest_framework import serializers, viewsets, exceptions
from rest_framework.permissions import BasePermission, IsAuthenticated

from core.models import Order, OrderHistoryItem, OrderItem, UserType, Meal


def can_status_be_modified(old_status, new_status, user_type):
    if user_type == UserType.REGULAR and (
        (old_status == Order.Status.PLACED and new_status == Order.Status.CANCELED)
        or (old_status == Order.Status.DELIVERED and new_status == Order.Status.RECEIVED)
    ):
        return True

    if user_type == UserType.OWNER and (
        (old_status == Order.Status.PLACED and new_status == Order.Status.PROCESSING)
        or (old_status == Order.Status.PROCESSING and new_status == Order.Status.IN_ROUTE)
        or (old_status == Order.Status.IN_ROUTE and new_status == Order.Status.DELIVERED)
    ):
        return True

    return False


class CanUpdateOrder(BasePermission):
    def has_object_permission(self, request, view, obj):
        if (request.user.user_type == UserType.OWNER and obj.restaurant.owner == request.user) or (
            request.user.user_type == UserType.REGULAR and obj.user == request.user
        ):
            return True
        return False


class MealWithIdSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(write_only=False)

    class Meta:
        model = Meal
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    meal = MealWithIdSerializer()

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
            raise exceptions.ValidationError({"detail": "Order must be created with PLACED status"})

        restaurant = validated_data.get("restaurant")
        order_items_to_create = []
        for order_item in validated_data.pop("orderitem_set"):
            meal = order_item.get("meal")
            if order_item.get("count") <= 0:
                continue
            if meal.get("restaurant") != restaurant:
                raise exceptions.ValidationError({"detail": f"{meal.get('name')} belongs to another restaurant"})
            order_item = OrderItem(meal_id=meal.get("id"), count=order_item.get("count"))
            order_items_to_create.append(order_item)

        if len(order_items_to_create) == 0:
            raise exceptions.ValidationError({"detail": "Order must have at least a single item in order"})

        order = Order.objects.create(**validated_data)
        for item in order_items_to_create:
            item.order_id = order.id
        OrderItem.objects.bulk_create(order_items_to_create)
        return order


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated & CanUpdateOrder]

    queryset = Order.objects.select_related("restaurant", "user")
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.user_type == UserType.REGULAR:
            return queryset.filter(user=self.request.user)
        return queryset.filter(restaurant__owner=self.request.user)

    def perform_update(self, serializer):
        if not ("status" in serializer.validated_data and len(serializer.validated_data) == 1):
            raise exceptions.ValidationError({"detail": "Only order status can be modified"})
        new_status = serializer.validated_data.get("status")
        old_status = serializer.instance.status
        if not can_status_be_modified(old_status, new_status, self.request.user.user_type) and new_status != old_status:
            raise exceptions.PermissionDenied()
        serializer.save()


class OrderHistoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistoryItem
        fields = "__all__"


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistoryItem.objects.select_related("order", "user")
    serializer_class = OrderHistoryItemSerializer
