from ..serializers import TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Turnir
from ..permissions import IsOwnerOrAdmin  # Importirajte prilagođeni permission


# Pogled za listanje i kreiranje turnira
class TurnirListCreate(generics.ListCreateAPIView):
    """
    Omogućava listanje svih turnira i kreiranje novih.
    Samo autentificirani korisnici mogu kreirati turnire.
    """
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatski postavlja trenutnog korisnika kao organizatora turnira.
        """
        serializer.save(organizator=self.request.user)


# Pogled za dohvaćanje, ažuriranje i brisanje pojedinačnog turnira
class TurnirDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava dohvaćanje, ažuriranje i brisanje pojedinačnog turnira.
    Samo organizator turnira ili administrator ima pristup.
    """
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated]
    
    #permission_classes = [IsAuthenticated, IsOwnerOrAdmin]


# Pogled za dohvaćanje turnira prema organizatoru
class TurnirVlasnik(generics.ListAPIView):
    """
    Omogućava dohvaćanje svih turnira određenog organizatora.
    Dostupno samo autentificiranim korisnicima.
    """
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        organizator_id = self.kwargs['vlasnik_id']
        return Turnir.objects.filter(organizator_id=organizator_id)


# Pogled za brisanje turnira
class TurnirDelete(generics.DestroyAPIView):
    """
    Omogućava brisanje turnira.
    Samo organizator turnira ili administrator ima pristup.
    """
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Turnir.objects.filter(id=pk)