from rest_framework import serializers, viewsets, generics, permissions

from core.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "email")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        if self.kwargs.get("pk") == "me":
            return self.request.user

        return super(UserViewSet, self).get_object()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "username", "password", "first_name", "last_name", "user_type")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        password = validate_data.pop("password")
        user = User(**validate_data)
        user.set_password(password)
        user.save()
        return user


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.none()
    serializer_class = UserCreateSerializer
    permission_classes = (permissions.AllowAny,)
