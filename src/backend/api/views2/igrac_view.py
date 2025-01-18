from ..serializers import IgracSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Igrac
from ..serializers import IgracSerializer
from ..permissions import IsIgracOrAdmin  # Importiramo prilagođene permissions


# Pogled za pojedinačnog igrača (čitanje, ažuriranje, brisanje)
class IgracRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Ovaj pogled omogućava dohvaćanje, ažuriranje i brisanje podataka o pojedinačnom igraču.
    Samo igrači ili administratori imaju pristup.
    """
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [IsAuthenticated, IsIgracOrAdmin]
    lookup_field = "user_id"




# Pogledi za Igrac
# Pogled za listanje svih igrača i kreiranje novog
class IgracListCreate(generics.RetrieveUpdateDestroyAPIView):
    """
    Ovaj pogled omogućava dohvaćanje svih igrača i kreiranje novog igrača.
    Samo autentificirani korisnici imaju pristup.
    """
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Postavlja trenutnog korisnika kao vlasnika novog Igrac objekta.
        """
        serializer.save(user=self.request.user)  
    
    
    # def get_queryset(self):
    #     try:
    #         pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
    #         return Igrac.objects.filter(user=pk)

    #     except:
    #         return Igrac.objects.filter()

class IgracListAll(generics.ListCreateAPIView):
    queryset=Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Igrac.objects.filter(id=pk)    