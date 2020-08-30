from rest_framework import serializers, viewsets

from core.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        if self.kwargs.get("pk") == "me":
            return self.request.user

        return super(UserViewSet, self).get_object()
