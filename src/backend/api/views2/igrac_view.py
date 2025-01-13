from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from ..models import Igrac
from ..serializers import IgracSerializer


# Pogledi za Igrac
class IgracListCreate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]
    lookup_field = "user_id"
    
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