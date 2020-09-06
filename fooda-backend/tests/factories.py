import factory

from core.models import User, UserType, Restaurant, Meal, Order, OrderItem


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Faker("first_name")
    username = factory.Sequence(lambda n: "user%d" % n)


class RestaurantFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Restaurant

    name = factory.Faker("company")
    description = factory.Faker("catch_phrase")
    owner = factory.SubFactory(UserFactory, user_type=UserType.OWNER)


class MealFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Meal

    name = factory.Sequence(lambda n: "product-%d" % n)
    price = factory.Faker("random_number", digits=3)
    restaurant = factory.SubFactory(RestaurantFactory)


class OrderItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OrderItem

    meal = factory.SubFactory(MealFactory, restaurant=factory.SelfAttribute("..order.restaurant"))
    count = factory.Faker("random_number", digits=1)


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory, user_type=UserType.OWNER)
    restaurant = factory.SubFactory(RestaurantFactory)
    orderitem_set = factory.RelatedFactory(OrderItemFactory, factory_related_name="order")
