from django.db import models
from django.contrib.auth.models import User

from backend.api.models2.vlasnik import *
from backend.api.models2.teren import *



class Turnir(models.Model):
    STATUS_TURNIRA_CHOICES = [
        ('otvoren', 'Otvoren za prijave'),
        ('zavrsen', 'Turnir odigran'),
    ]

    naziv = models.CharField(max_length=200)
    teren = models.ForeignKey(Teren, on_delete=models.CASCADE, null=True, related_name='turniri')
    datum_pocetka = models.DateTimeField()
    datum_kraja = models.DateTimeField()
    cijena_kotizacije = models.DecimalField(max_digits=10, decimal_places=2)
    nagrade = models.TextField()
    opis = models.TextField()
    organizator = models.ForeignKey(Vlasnik, on_delete=models.CASCADE, related_name='turniri')
    otvorenost = models.CharField(max_length=10, choices=STATUS_TURNIRA_CHOICES)

    def __str__(self):
        return self.naziv