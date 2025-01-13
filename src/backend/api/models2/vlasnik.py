
from django.db import models
from django.contrib.auth.models import User


# Model za Vlasnika
class Vlasnik(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    javni_profil = models.URLField(blank=True, null=True)  # Poveznica na javni profil

    def __str__(self):
        return self.user.username
