from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from django.contrib.auth.models import User, Group

from api.models import Igrac
from api.views import CreateUserView

import requests

class LogInWithGoogle(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            code = requests.get(f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={request.data["google_access_token"]}')
            decoded = code.json()

            email = decoded["email"]
            name = email.split('@')[0]
            first_name = decoded["given_name"]
            last_name = ""
            try:
                last_name = decoded["family_name"]
            except:
                pass

            user = User.objects.filter(email = email).first()

            if user is None:
                user = User.objects.create_user(username=name, email=email, first_name=first_name, last_name=last_name, password="", is_active=True)
                Igrac.objects.create(user=user)
                user.groups.add(Group.objects.get(name='Igraci'))

            refresh = RefreshToken.for_user(user)
            return Response(data= {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': str(user.username)
                })
        except (error):
            print(error)
            return Response("Failed")