from ..serializers import VlasnikSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Vlasnik

# Pogledi za Vlasnik
class VlasnikListCreate(generics.ListCreateAPIView):
    queryset = Vlasnik.objects.all()
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]