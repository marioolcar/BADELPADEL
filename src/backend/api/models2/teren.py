from django.db import models
from backend.api.models2.vlasnik import Vlasnik


# Model za Teren
class Teren(models.Model):
    TIP_TERENA_CHOICES = [
        ('unutarnji', 'Unutarnji'),
        ('vanjski', 'Vanjski'),
    ]

    lokacija_grad = models.CharField(max_length=100)
    lokacija_ulica = models.CharField(max_length=200)
    slika = models.ImageField(upload_to='teren_images/', blank=True, null=True)
    tip = models.CharField(max_length=10, choices=TIP_TERENA_CHOICES)
    dostupni_termini = models.JSONField()  # JSON za pohranu više termina s datumom, vremenom i cijenom
    vlasnik = models.ForeignKey(Vlasnik, on_delete=models.CASCADE, related_name='tereni')
    
    def __str__(self):
        return f"{self.lokacija_grad}, {self.lokacija_ulica}"
