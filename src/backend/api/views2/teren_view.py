from ..serializers import TerenSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..permissions import IsOwnerOrAdmin  # prilagođeni permission

from ..models import Teren



# Pogled za listanje i kreiranje terena
class TerenListCreate(generics.ListCreateAPIView):
    """
    Omogućava listanje svih terena i kreiranje novih.
    Samo autentificirani korisnici mogu kreirati terene.
    """
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatski postavlja trenutnog korisnika kao vlasnika terena.
        """
        serializer.save(vlasnik=self.request.user)


# Pogled za dohvaćanje, ažuriranje i brisanje pojedinačnog terena
class TerenDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava dohvaćanje, ažuriranje i brisanje pojedinačnog terena.
    Samo vlasnik terena ili administrator ima pristup.
    """
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [AllowAny]
    #permission_classes = [IsAuthenticated, IsOwnerOrAdmin]


# Pogled za dohvaćanje terena prema vlasniku
class TerenVlasnik(generics.ListAPIView):
    """
    Omogućava dohvaćanje svih terena određenog vlasnika.
    Dostupno samo autentificiranim korisnicima.
    """
    serializer_class = TerenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        vlasnik_id = self.kwargs['vlasnik_id']
        return Teren.objects.filter(vlasnik_id=vlasnik_id)


# Pogled za upload slika terena
class UploadTerenImage(APIView):
    """
    Omogućava upload slike za teren.
    Samo autentificirani korisnici mogu uploadati slike.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = TerenSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(vlasnik=request.user)  # Postavlja trenutnog korisnika kao vlasnika
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Pogled za brisanje terena
class TerenDelete(generics.DestroyAPIView):
    """
    Omogućava brisanje terena.
    Samo vlasnik terena ili administrator ima pristup.
    """
    serializer_class = TerenSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Teren.objects.filter(id=pk)
    