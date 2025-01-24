from datetime import datetime
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
    #javni_profil = models.URLField(blank=True, null=True)  # Poveznica na javni profil
    adresa = models.CharField(max_length=100)
    slika = models.URLField(blank=True, null=True)
    telefon = models.CharField(max_length=20, default="0999696969")
    def __str__(self):
        return self.user.username

# Model za Igrača
class Igrac(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #javni_profil = models.URLField(blank=True, null=True)  # Poveznica na javni profil
    slika = models.URLField(blank=True, null=True)
    telefon = models.CharField(max_length=20, default="0999696969")
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
    vlasnik = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tereni')
    
    def __str__(self):
        return f"{self.lokacija_grad}, {self.lokacija_ulica}"


# Model za Turnir
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
    organizator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='turniri')
    otvorenost = models.CharField(max_length=10, choices=STATUS_TURNIRA_CHOICES, default="otvoren")

    def __str__(self):
        return self.naziv



class Post(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    teren_id = models.ForeignKey(Teren, on_delete=models.CASCADE,blank=True)
    turnir_id = models.ForeignKey(Turnir, on_delete=models.CASCADE, blank=True)
    slika = models.ImageField(upload_to='post_images/', blank=True, null=True)
    naslov = models.CharField(max_length=100)
    opis = models.CharField(max_length=500)
    #broj_like = models.IntegerField(default=0)
    #broj_comment = models.IntegerField(default=0)
    vrijeme =  models.TimeField(default=datetime.now())
    
    def __str__(self):
        return f"{self.naslov}, {self.user_id}, {self.teren_id}, {self.turnir_id}"

    
    
class Komentar(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    teren_id = models.ForeignKey(Teren, on_delete=models.CASCADE,blank=True)
    turnir_id = models.ForeignKey(Turnir, on_delete=models.CASCADE, blank=True)
    slika = models.ImageField(upload_to='post_images/', blank=True, null=True)
    naslov = models.CharField(max_length=100)
    opis = models.CharField(max_length=500)
    #broj_like = models.IntegerField(default=0)
    #broj_comment = models.IntegerField(default=0)
    vrijeme =  models.TimeField(default=datetime.now())
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    
    
    def __str__(self):
        return f"{self.naslov}, {self.user_id}, {self.teren_id}, {self.turnir_id}"
    
class TurnirPrijava(models.Model):
    STATUS_PRIJAVE_CHOICES = [
        ('prihvaćena', 'Prijava prihvaćena'),
        ('pending', 'Prijava čeka potvrdu'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    turnir = models.ForeignKey(Turnir, on_delete=models.CASCADE)
    status = models.CharField(max_length=11, choices=STATUS_PRIJAVE_CHOICES, default="pending")
    def __str__(self):
        return f'{self.turnir}, {self.user}'

class Termin(models.Model):
    teren = models.ForeignKey(Teren, on_delete=models.CASCADE)
    pocetak = models.DateTimeField()
    kraj = models.DateTimeField()
    cijena = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f'{self.teren}, {self.pocetak}'

class ZauzetiTermin(models.Model):
    #user je id korisnika koji je rezervirao termin
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    teren = models.ForeignKey(Teren, on_delete=models.CASCADE)
    pocetak = models.DateTimeField()
    kraj = models.DateTimeField()
    cijena = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f'{self.teren}, {self.pocetak}'