from ..serializers import ZauzetiTerminSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import ZauzetiTermin

class ZauzetiTerminListCreate(generics.ListCreateAPIView):
    serializer_class = ZauzetiTerminSerializer
    permission_classes = [AllowAny]
    queryset = ZauzetiTermin.objects.all()

    def perform_create(self, serializer):
        if (serializer.is_valid):
            serializer.save(user = self.request.user)
        else:
            print(serializer.errors)

    def get_queryset(self):
        try:
            return ZauzetiTermin.objects.filter(user = self.request.user)
        except:
            return None

class ZauzetiTerminPerField(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ZauzetiTerminSerializer

    def get_queryset(self):
        try:
            user_id = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return ZauzetiTermin.objects.filter(user = user_id)
        except:
            return None

class ZauzetiTerminDelete(generics.DestroyAPIView):
    serializer_class = ZauzetiTerminSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        termin_id = kwargs['pk']  # Dohvaćanje `pk` iz URL-a\
        termin = ZauzetiTermin.objects.filter(id=termin_id)
        terminValues = list(termin.values())
        self.delete_termin(termin)
        return Response (data= {"termin": terminValues[0]})

    def delete_termin(self, termin):
        termin.delete()