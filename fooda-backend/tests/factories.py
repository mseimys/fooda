import factory

from core.models import User, UserType, Restaurant, Meal


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
