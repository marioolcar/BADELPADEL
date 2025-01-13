from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from ..models import Vlasnik
from ..serializers import VlasnikSerializer

# Pogledi za Vlasnik
class VlasnikListCreate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vlasnik.objects.all()
    lookup_field = "user_id"
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]
    
    # def get_queryset(self):
    #     try:
    #         pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
    #         return Vlasnik.objects.filter(user=pk)
    #     except:
    #         pass
    #         return Vlasnik.objects.filter()

class VlasnikListAll(generics.ListCreateAPIView):
    queryset=Vlasnik.objects.all()
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]
