from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from django.contrib.auth.models import User
from api.views import CreateUserView

import jwt

class LogInWithGoogle(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        if 'code' in request.data.keys():

            code = request.data['code']
            try:
                decoded = jwt.decode(code, options={"verify_signature": False})
                print(decoded)

                email = decoded["email"]
                name = email.split('@')[0]
                first_name = decoded["given_name"]
                last_name = decoded["family_name"]

                if len(User.objects.filter(email = email)) == 0:
                    User.objects.create_user(username=name, email=email, first_name=first_name, last_name=last_name, password="pass", is_active=True)
            except:
                return Response("Failed")
        return Response("Success")