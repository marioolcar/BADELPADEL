from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .models import Teren, Turnir, Vlasnik, Igrac
from .serializers import TerenSerializer, TurnirSerializer, VlasnikSerializer, IgracSerializer



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
    permission_classes = [IsAuthenticated]
    #promjeni IsAuthenticated


class TerenDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teren.objects.all()
    serializer_class = TerenSerializer
    permission_classes = [IsAuthenticated]


# Pogledi za Turnir
class TurnirListCreate(generics.ListCreateAPIView):
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated]
    #promjeni IsAuthenticated

    


class TurnirDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turnir.objects.all()
    serializer_class = TurnirSerializer
    permission_classes = [IsAuthenticated]
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

