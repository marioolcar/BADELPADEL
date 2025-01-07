from ..serializers import IgracSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Igrac


# Pogledi za Igrac
class IgracListCreate(generics.ListCreateAPIView):
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Igrac.objects.filter(id=pk)   
        except:
            return Igrac.objects.filter()
    
class IgracDelete(generics.DestroyAPIView):
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Igrac.objects.filter(id=pk)    