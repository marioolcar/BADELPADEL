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
    path("tereni/delete/<int:pk>/", TerenDelete.as_view(), name="teren-delete"),
    path('tereni/upload/', UploadTerenImage.as_view(), name='teren-upload'),
    path('tereni/vlasnik/<int:vlasnik_id>/', TerenVlasnik.as_view(), name="teren-vlasnik"),
    
    
    
    # Rute za turnir
    path("turniri/", TurnirListCreate.as_view(), name="turnir-list"),
    path("turniri/<int:pk>/", TurnirDetail.as_view(), name="turnir-detail"),
    path("turniri/delete/<int:pk>/", TurnirDelete.as_view(), name="turnir-delete"),
    path('turniri/vlasnik/<int:vlasnik_id>/', TurnirVlasnik.as_view(), name="turnir-vlasnik"),
    
    
    
    # Rute za vlasnike i igrače
    path("vlasnici/", VlasnikListCreate.as_view(), name="vlasnik-list"),
    path("vlasnici/delete/<int:pk>/", VlasnikDelete.as_view(), name="vlasnik-delete"),
    path("vlasnici/<int:pk>/", VlasnikListCreate.as_view(), name="vlasnik-pojedinacno"),
    
    
    path("igraci/", IgracListCreate.as_view(), name="igrac-list"),
    path("igraci/delete/<int:pk>/", IgracDelete.as_view(), name="igrac-delete"),
    path("igraci/<int:pk>/", IgracListCreate.as_view(), name="igrac-pojedinacno"),
    
    
    
    #path za post
    path('post/', PostListCreate.as_view(), name='post-list'),
    path('post/delete/<int:pk>/', PostDelete.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetail.as_view(), name='post-delete'),
    path('post/user/<int:user_id>', PostUser.as_view(), name="post-user"),
    path('post/Teren/<int:teren_id>', PostTeren.as_view(), name="post-teren"),
    path('post/Turnir/<int:turnir_id>', PostTurnir.as_view(), name="post-turnir"),
    
    
    
    
    #path za komentar
    path('komentar/', KomentarListCreate.as_view(), name='komentar-list'),
    path('komentar/delete/<int:pk>/', KomentarDelete.as_view(), name='komentar-delete'),
    path('komentar/<int:pk>', KomentarDetail.as_view(), name="komentar-id"),
    path('komentar/post/<int:post_id>', KomentarPost.as_view(), name="komentar-post"),
    path('komentar/user/<int:user_id>', KomentarUser.as_view(), name="komentar-user"),

]



