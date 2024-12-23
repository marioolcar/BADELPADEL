from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


# Model za Vlasnika
class Vlasnik(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    javni_profil = models.URLField(blank=True, null=True)  # Poveznica na javni profil

    def __str__(self):
        return self.user.username

# Model za Igrača
class Igrac(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    javni_profil = models.URLField(blank=True, null=True)  # Poveznica na javni profil

    def __str__(self):
        return self.user.username

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

# Model za Turnir
class Turnir(models.Model):
    STATUS_TURNIRA_CHOICES = [
        ('otvoren', 'Otvoren za prijave'),
        ('zavrsen', 'Turnir odigran'),
    ]

    naziv = models.CharField(max_length=200)
    teren = models.ForeignKey(Teren, on_delete=models.SET_NULL, null=True, related_name='turniri')
    datum_pocetka = models.DateTimeField()
    datum_kraja = models.DateTimeField()
    cijena_kotizacije = models.DecimalField(max_digits=10, decimal_places=2)
    nagrade = models.TextField()
    opis = models.TextField()
    organizator = models.ForeignKey(Vlasnik, on_delete=models.CASCADE, related_name='turniri')
    otvorenost = models.CharField(max_length=10, choices=STATUS_TURNIRA_CHOICES)

    def __str__(self):
        return self.naziv
