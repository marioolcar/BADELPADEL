from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.contrib.auth.models import User, Group

from api.models import Igrac, Vlasnik
from api.views import CreateUserView
from django.core.files.base import ContentFile

import requests

class LogInWithGoogle(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            code = requests.get(f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={request.data["google_access_token"]}')
            decoded = code.json()
            print(decoded)

            email = decoded["email"]
            name = email.split('@')[0]
            first_name = decoded["given_name"]
            last_name = ""
            try:
                last_name = decoded["family_name"]
            except:
                pass
            image = decoded["picture"]

            user = User.objects.filter(email = email).first()

            if user is None:
                user = User.objects.create_user(username=name, email=email, first_name=first_name, last_name=last_name, password="", is_active=True)
                Igrac.objects.create(user=user, slika=image)
                user.groups.add(Group.objects.get(name='Igraci'))

            refresh = RefreshToken.for_user(user)
            return Response(data= {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': str(user.username)
                })
        except Exception as e:
            print(e)
            return Response("Failed")

class RegisterOwner(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        telefon = request.data['telefon']
        adresa = request.data['adresa']
        user = self.request.user
        user.groups.clear()
        user.groups.add(Group.objects.get(name="Vlasnici"))
        picture = Igrac.objects.get(user=user).slika
        Igrac.objects.get(user=user).delete()
        Vlasnik.objects.create(user=user, telefon= telefon, adresa = adresa, slika=picture)
        return Response("Success")

class RegisterPlayer(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        user.groups.clear()
        user.groups.add(Group.objects.get(name="Igraci"))
        picture = Vlasnik.objects.get(user=user).slika
        Vlasnik.objects.get(user=user).delete()
        Igrac.objects.create(user=user, slika=picture)
        return Response("Success")