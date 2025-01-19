from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from ..models import Vlasnik
from ..permissions import IsOwnerOrAdmin  # Prilagođeni permission
from ..serializers import VlasnikSerializer


# Pogled za listanje i kreiranje vlasnika
class VlasnikListCreate(generics.ListCreateAPIView):
    """
    Omogućava listanje svih vlasnika i kreiranje novih.
    Samo autentificirani korisnici mogu kreirati vlasnike.
    """
    queryset = Vlasnik.objects.all()
    lookup_field = "user_id"
    serializer_class = VlasnikSerializer
    permission_classes = [IsAuthenticated]
"""
    def perform_create(self, serializer):
        #Automatski postavlja trenutnog korisnika kao vlasnika.
        serializer.save(user=self.request.user)


"""
        
class VlasnikListAll(generics.ListCreateAPIView):
    queryset = Vlasnik.objects.all()
    lookup_field = "user_id"
    serializer_class = VlasnikSerializer
    permission_classes = [IsAuthenticated]


# Pogled za brisanje vlasnika
class VlasnikDelete(generics.DestroyAPIView):
    """
    Omogućava brisanje vlasnika.
    Samo vlasnik ili administrator može obrisati zapis.
    """
    serializer_class = VlasnikSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Vlasnik.objects.filter(id=pk)
