from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


from .models import Teren, Turnir, Vlasnik, Igrac


class VlasnikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vlasnik
        fields = ['id', 'user', 'javni_profil']


class IgracSerializer(serializers.ModelSerializer):
    class Meta:
        model = Igrac
        fields = ['id', 'user', 'javni_profil']


class TerenSerializer(serializers.ModelSerializer):
    #slika_url = serializers.SerializerMethodField()

    class Meta:
        model = Teren
        fields = ['id', 'lokacija_grad', 'lokacija_ulica','slika', 'tip', 'dostupni_termini', 'vlasnik']

    def get_slika_url(self, obj):
        request = self.context.get('request')
        if obj.slika:
            return request.build_absolute_uri(obj.slika.url)
        return None

class TurnirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turnir
        fields = ['id', 'naziv', 'teren', 'datum_pocetka', 'datum_kraja', 'cijena_kotizacije', 'nagrade', 'opis', 'organizator', 'otvorenost']
