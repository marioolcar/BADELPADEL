from django.urls import path

from .views2.komentar_view import *

from .views2.post_view import *


from .views2.igrac_view import *
from .views2.note_view import *
from .views2.teren_view import *
from .views2.turnir_view import *
from .views2.vlasnik_view import *
from .views2.prijave_view import *
from .views2.termin_view import *
from .views2.zauzeti_termin_view import *
from .views2.user_type import *


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

    path("user/", UserPermissionType.as_view(), name="user-type"),

    path("notes/", NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
    # Rute za teren
    path("tereni/", TerenListCreate.as_view(), name="teren-list"),
    path("tereni/<int:pk>/", TerenDetail.as_view(), name="teren-detail"),
    path("tereni/delete/<int:pk>/", TerenDelete.as_view(), name="teren-delete"),
    path('tereni/upload/', UploadTerenImage.as_view(), name='teren-upload'),
    path('tereni/vlasnik/<int:vlasnik_id>/', TerenVlasnik.as_view(), name="teren-vlasnik"),
    path('tereni/vlasnik/', TerenVlasnikCurrent.as_view(), name="teren-vlasnik-trenutni"),
    
    # Rute za turnir
    path("turniri/", TurnirListCreate.as_view(), name="turnir-list"),
    path("turniri/<int:pk>/", TurnirDetail.as_view(), name="turnir-detail"),
    path("turniri/delete/<int:pk>/", TurnirDelete.as_view(), name="turnir-delete"),
    path('turniri/vlasnik/<int:organizator>/', TurnirVlasnik.as_view(), name="turnir-vlasnik"),
    path('turniri/vlasnik/', TurnirVlasnikCurrent.as_view(), name="turnir-vlasnik-trenutni"),
    
    # Rute za vlasnike i igrače
    path("vlasnici/", VlasnikListAll.as_view(), name="vlasnik-list"),
    path("vlasnici/<int:user_id>/", VlasnikListCreate.as_view(), name="vlasnik-pojedinacno"),
    path("vlasnici/current/", VlasnikCurrent.as_view(), name="vlasnik-trenutni"),
    
    path("igraci/", IgracListAll.as_view(), name="igrac-list"),
    path("igraci/<int:user_id>/", IgracListCreate.as_view(), name="igrac-pojedinacno"),
    
    #path za post
    path('post/', PostListCreate.as_view(), name='post-list'),
    path('post/delete/<int:pk>/', PostDelete.as_view(), name='post-delete'),
    path('post/<int:pk>/', PostDetail.as_view(), name='post-delete'),
    path('post/user/<int:user_id>/', PostUser.as_view(), name="post-user"),
    path('post/Turnir/<int:turnir_id>/', PostTurnir.as_view(), name="post-turnir"),
    
    #path za komentar
    path('komentar/', KomentarListCreate.as_view(), name='komentar-list'),
    path('komentar/delete/<int:pk>/', KomentarDelete.as_view(), name='komentar-delete'),
    path('komentar/<int:pk>', KomentarDetail.as_view(), name="komentar-id"),
    path('komentar/post/<int:post_id>', KomentarPost.as_view(), name="komentar-post"),
    path('komentar/user/<int:user_id>', KomentarUser.as_view(), name="komentar-user"),

    path('prijava/', PrijaveListCreate.as_view(), name='prijava-list'),
    path('prijava/accept/', PrijavaAccept.as_view(), name='prijava-accept'),
    path('prijava/delete/turnir/<int:turnir_id>/', PrijaveDeleteTurnir.as_view(), name='prijava-delete'),
    path('prijava/delete/turnir/<int:turnir_id>/user/<int:user_id>/', PrijaveDeleteForUser.as_view(), name='prijava-delete'),
    path('prijava/user/', PrijaveUser.as_view(), name="prijave-user"),
    path('prijava/turnir/<int:turnir_id>/', PrijaveTurnir.as_view(), name="prijave-turnir"),
    path('prijava/turnir/<int:turnir_id>/igraci/', PrijaveIgracTurnir.as_view(), name="prijave-igrac-turnir"),

    path('termin/', TerminListCreate.as_view(), name='termin-list'),
    path('termin/<int:pk>/', TerminPerField.as_view(), name='termin-teren'),
    path('termin/delete/<int:pk>/', TerminDelete.as_view(), name='delete-termin'),

    path('termin/zauzeti/', ZauzetiTerminListCreate.as_view(), name='zauzeti-termin-list'),
    path('termin/zauzeti/<int:pk>/', ZauzetiTerminPerField.as_view(), name='zauzeti-termin-user'),
    path('termin/zauzeti/delete/<int:pk>/', ZauzetiTerminDelete.as_view(), name='delete-zauzeti-termin'),
]



