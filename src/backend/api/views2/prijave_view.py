from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from ..models import TurnirPrijava
from ..serializers import TurnirPrijavaSerialzier

class PrijaveListCreate(generics.ListCreateAPIView):
    queryset=TurnirPrijava.objects.all()
    serializer_class = TurnirPrijavaSerialzier
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class PrijaveUser(generics.ListCreateAPIView):
    queryset = TurnirPrijava.objects.all()
    serializer_class = TurnirPrijavaSerialzier
    permission_classes = [AllowAny]

    def get_object(self):
        try:
            print(TurnirPrijava.objects.filter(user=self.request.user.id))
            return TurnirPrijava.objects.filter(user=self.request.user.id)
        except:
            return None

class PrijaveTurnir(generics.ListCreateAPIView):
    queryset = TurnirPrijava.objects.all()
    serializer_class = TurnirPrijavaSerialzier
    permission_classes = [AllowAny]
    lookup_field = "turnir"

class PrijaveIgracTurnir(generics.ListCreateAPIView):
    queryset = TurnirPrijava.objects.all()
    serializer_class = TurnirPrijavaSerialzier
    permission_classes = [AllowAny]

    def get_queryset(self):

        turnir_id = self.kwargs['turnir_id']
        user_id = self.request.user
        return TurnirPrijava.objects.filter(user=user_id, turnir=turnir_id)

class PrijaveDeleteTurnir(generics.DestroyAPIView):
    serializer_class = TurnirPrijava
    permission_classes = [IsAuthenticated]
    lookup_field = "turnir_id"

    def get_queryset(self):
        turnir = self.kwargs['turnir_id']
        user = self.request.user
        return TurnirPrijava.objects.filter(turnir=turnir,user=user)