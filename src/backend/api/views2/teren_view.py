from ..serializers import TerenSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..models import Teren



# Pogledi za Teren
class TerenListCreate(generics.ListCreateAPIView):
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated

class TerenDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Teren.objects.filter(id=pk)   
        except:
            return Teren.objects.filter()
        
#promjenjen generics.RetrieveUpdateDestroyAPIView u generics.ListCreateAPIView kako bi mogo dobit vise terena za jednog vlasnika
class TerenVlasnik(generics.ListCreateAPIView):
    lookup_field = 'vlasnik_id'
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        try:
            pk = self.kwargs['vlasnik_id']  # Dohvaćanje `pk` iz URL-a
            return Teren.objects.filter(vlasnik=pk)   
        except:
            return Teren.objects.filter()
    
class UploadTerenImage(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # Omogućuje obradu slika

    def post(self, request, *args, **kwargs):
        serializer = TerenSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class TerenDelete(generics.DestroyAPIView):
    serializer_class = TerenSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Teren.objects.filter(id=pk)