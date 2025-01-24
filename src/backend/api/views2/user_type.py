from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

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