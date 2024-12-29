from django.urls import path

from .views2.komentar_view import *

from .views2.post_view import *


from .views2.igrac_view import *
from .views2.note_view import *
from .views2.teren_view import *
from .views2.turnir_view import *
from .views2.vlasnik_view import *


#from . import views
from .views2 import *
#from rest_framework import generics
#from rest_framework.permissions import IsAuthenticated, AllowAny
#from .models import Teren, Turnir, Vlasnik, Igrac
#from .serializers import TerenSerializer, TurnirSerializer, VlasnikSerializer, IgracSerializer
from django.urls import path
#from .views import UploadTerenImage
from django.views.generic.base import RedirectView



urlpatterns = [
    path("notes/", NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
    # Rute za teren
    path("tereni/", TerenListCreate.as_view(), name="teren-list"),
    path("tereni/<int:pk>/", TerenDetail.as_view(), name="teren-detail"),
    path("tereni/delete/<int:pk>/", TerenDelete.as_view(), name="delete-teren"),
    
    
    # Rute za turnir
    path("turniri/", TurnirListCreate.as_view(), name="turnir-list"),
    path("turniri/<int:pk>/", TurnirDetail.as_view(), name="turnir-detail"),
    path("notes/delete/<int:pk>/", TurnirDelete.as_view(), name="delete-turnir"),
    
    
    # Rute za vlasnike i igrače
    path("vlasnici/", VlasnikListCreate.as_view(), name="vlasnik-list"),
    
    #path("vlasnici/delete/<int:pk>/", VlasnikDelete.as_view(), name="vlasnik-list"),
    
    path("igraci/", IgracListCreate.as_view(), name="igrac-list"),
    #path("igraci/delete/<int:pk>/", IgracDelete.as_view(), name="vlasnik-list"),
    
    #path za uploadanje slike
    path('tereni/upload/', UploadTerenImage.as_view(), name='teren-upload'),
    
    #path za post
    path('post/', PostListCreate.as_view(), name='post-list'),
    
    
    #path za komentar
    path('komentar/', KomentarListCreate.as_view(), name='komentar-list'),
    
]



