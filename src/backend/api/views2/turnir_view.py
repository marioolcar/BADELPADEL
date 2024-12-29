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

class TurnirDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    
class TurnirDelete(generics.DestroyAPIView):
    serializer_class = TurnirSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Turnir.objects.filter(author=user)