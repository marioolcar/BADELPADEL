from ..serializers import IgracSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Igrac


# Pogledi za Igrac
class IgracListCreate(generics.ListCreateAPIView):
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]
    
class IgracDelete(generics.DestroyAPIView):
    serializer_class = IgracSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Igrac.objects.filter(author=user)