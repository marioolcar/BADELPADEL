from ..serializers import VlasnikSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Vlasnik

# Pogledi za Vlasnik
class VlasnikListCreate(generics.ListCreateAPIView):
    queryset = Vlasnik.objects.all()
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]
    
    
class VlasnikDelete(generics.DestroyAPIView):
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Vlasnik.objects.filter(id=pk)    