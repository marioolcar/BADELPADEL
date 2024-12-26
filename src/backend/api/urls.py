from django.urls import path
from . import views
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Teren, Turnir, Vlasnik, Igrac
from .serializers import TerenSerializer, TurnirSerializer, VlasnikSerializer, IgracSerializer
from django.urls import path
from .views import UploadTerenImage



urlpatterns = [
    
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    # Rute za teren
    path("tereni/", views.TerenListCreate.as_view(), name="teren-list"),
    path("tereni/<int:pk>/", views.TerenDetail.as_view(), name="teren-detail"),
    
    # Rute za turnir
    path("turniri/", views.TurnirListCreate.as_view(), name="turnir-list"),
    path("turniri/<int:pk>/", views.TurnirDetail.as_view(), name="turnir-detail"),
    
    # Rute za vlasnike i igrače
    path("vlasnici/", views.VlasnikListCreate.as_view(), name="vlasnik-list"),
    path("igraci/", views.IgracListCreate.as_view(), name="igrac-list"),
    
    #path za uploadanje slike
    path('tereni/upload/', UploadTerenImage.as_view(), name='teren-upload'),
]



