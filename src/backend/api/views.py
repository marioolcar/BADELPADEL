from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .models import Teren, Turnir, Vlasnik, Igrac
from .serializers import TerenSerializer, TurnirSerializer, VlasnikSerializer, IgracSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Teren
from .serializers import TerenSerializer


class UploadTerenImage(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Omogućuje obradu slika

    def post(self, request, *args, **kwargs):
        serializer = TerenSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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
    
# Pogledi za Vlasnik
class VlasnikListCreate(generics.ListCreateAPIView):
    queryset = Vlasnik.objects.all()
    serializer_class = VlasnikSerializer
    permission_classes = [AllowAny]

# Pogledi za Igrac
class IgracListCreate(generics.ListCreateAPIView):
    queryset = Igrac.objects.all()
    serializer_class = IgracSerializer
    permission_classes = [AllowAny]

