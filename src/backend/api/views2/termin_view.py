from ..serializers import TerminSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import Termin
from copy import deepcopy

class TerminListCreate(generics.ListCreateAPIView):
    serializer_class = TerminSerializer
    permission_classes = [AllowAny]
    queryset = Termin.objects.all()
    
    def perform_create(self, serializer):
        if (serializer.is_valid):
            serializer.save()
        else:
            print(serializer.errors)

class TerminPerField(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = TerminSerializer

    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Termin.objects.filter(teren=pk)
        except:
            return None

class TerminDelete(generics.DestroyAPIView):
    serializer_class = TerminSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        termin_id = kwargs['pk']  # Dohvaćanje `pk` iz URL-a\
        termin = Termin.objects.filter(id=termin_id)
        terminValues = list(termin.values())
        self.delete_termin(termin)
        return Response (data= {"termin": terminValues[0]})

    def delete_termin(self, termin):
        termin.delete()