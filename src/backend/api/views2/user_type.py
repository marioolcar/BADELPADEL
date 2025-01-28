from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import UserSerializer
from django.contrib.auth.models import User

class UserPermissionType(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if self.request.user.groups.filter(name = "Igraci").exists():
            return Response(data={"type": "igrac"})
        elif self.request.user.groups.filter(name = "Vlasnici").exists():
            return Response(data={"type": "vlasnik"})
        elif self.request.user.groups.filter(name = "Admins").exists():
            return Response(data={"type": "admin"})
        else:
            return Response(data={"type": "none"})

class UserDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        try:
            id = self.kwargs["pk"]
            return User.objects.filter(id=id)
        except:
            return None