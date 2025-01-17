from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Komentar, Note, Post


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


from .models import Teren, Turnir, TurnirPrijava
from .models import Vlasnik, Igrac


class VlasnikSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Vlasnik
        #fields = ['id', 'user', 'javni_profil']
        fields = '__all__'
        


class IgracSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Igrac
        #fields = ['id', 'user', 'javni_profil']
        fields = '__all__'


class TerenSerializer(serializers.ModelSerializer):
    #slika_url = serializers.SerializerMethodField()

    class Meta:
        model = Teren
        fields = ['id', 'lokacija_grad', 'lokacija_ulica', 'slika', 'tip', 'dostupni_termini', 'vlasnik']
        extra_kwargs = {"vlasnik": {"required": False}, "slika":{"required": False}, "otvorenost": {"required": False}}

    def get_slika_url(self, obj):
        request = self.context.get('request')
        if obj.slika:
            return request.build_absolute_uri(obj.slika.url)
        return None

class TurnirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turnir
        fields = ['id', 'naziv', 'teren', 'datum_pocetka', 'datum_kraja', 'cijena_kotizacije', 'nagrade', 'opis', 'organizator', 'otvorenost']
        extra_kwargs = {"organizator": {"required": False}}

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {"user_id": {"read_only": True}}

class KomentarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Komentar
        #fields = ['id', 'user_id', 'teren_id', 'turnir_id', 'slika', 'naslov', 'opis', 'broj_like', 'broj_comment', 'vrijeme']
        
        fields = '__all__'

class TurnirPrijavaSerialzier(serializers.ModelSerializer):
    class Meta:
        model = TurnirPrijava
        fields = ['turnir', 'id']
        extra_kwargs = {"user": {"required": False}}

