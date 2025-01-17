from ..serializers import TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Turnir



# Pogledi za Turnir
class TurnirListCreate(generics.ListCreateAPIView):
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(organizator=self.request.user)
        else:
            print(serializer.errors)

    

class TurnirDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Turnir.objects.filter(id=pk)
        except:
            return Turnir.objects.filter()

#promjenjen generics.RetrieveUpdateDestroyAPIView u generics.ListCreateAPIView kako bi mogo dobit vise turnira za jednog organizatora
class TurnirVlasnik(generics.ListCreateAPIView):
    lookup_field = 'organizator'
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['organizator']  # Dohvaćanje `pk` iz URL-a
            return Turnir.objects.filter(organizator=pk)   
        except:
            return Turnir.objects.filter()
    
class TurnirDelete(generics.DestroyAPIView):
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Turnir.objects.filter(id=pk)