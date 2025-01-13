from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from django.http import HttpResponse

from ..models import User
from ..serializers import UserSerializer

class UserGetId(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        try:
            print(User.objects.filter(id=self.request.user.id).first())
            return User.objects.filter(id=self.request.user.id).first()
        except:
            return None