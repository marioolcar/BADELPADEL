# Generated by Django 5.1.4 on 2025-01-27 12:15

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Igrac',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slika', models.URLField(blank=True, null=True)),
                ('telefon', models.CharField(default='0999696969', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Teren',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lokacija_grad', models.CharField(max_length=100)),
                ('lokacija_ulica', models.CharField(max_length=200)),
                ('slika', models.ImageField(blank=True, null=True, upload_to='teren_images/')),
                ('tip', models.CharField(choices=[('unutarnji', 'Unutarnji'), ('vanjski', 'Vanjski')], max_length=10)),
                ('vlasnik', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tereni', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': [('can_manage_teren', 'Može upravljati terenima'), ('can_view_teren', 'Može pregledati terene')],
            },
        ),
        migrations.CreateModel(
            name='Termin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pocetak', models.DateTimeField()),
                ('kraj', models.DateTimeField()),
                ('cijena', models.DecimalField(decimal_places=2, max_digits=10)),
                ('teren', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.teren')),
            ],
        ),
        migrations.CreateModel(
            name='Turnir',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('naziv', models.CharField(max_length=200)),
                ('datum_pocetka', models.DateTimeField()),
                ('datum_kraja', models.DateTimeField()),
                ('cijena_kotizacije', models.DecimalField(decimal_places=2, max_digits=10)),
                ('nagrade', models.TextField()),
                ('opis', models.TextField()),
                ('otvorenost', models.CharField(choices=[('otvoren', 'Otvoren za prijave'), ('zavrsen', 'Turnir odigran')], default='otvoren', max_length=10)),
                ('organizator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='turniri', to=settings.AUTH_USER_MODEL)),
                ('teren', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='turniri', to='api.teren')),
            ],
            options={
                'permissions': [('can_manage_turnir', 'Može upravljati turnir'), ('can_view_turnir', 'Može pregledati turnir')],
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slika', models.ImageField(blank=True, null=True, upload_to='post_images/')),
                ('naslov', models.CharField(max_length=100)),
                ('opis', models.CharField(max_length=500)),
                ('vrijeme', models.TimeField(default=datetime.datetime(2025, 1, 27, 13, 15, 28, 732480))),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('teren_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.teren')),
                ('turnir_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.turnir')),
            ],
        ),
        migrations.CreateModel(
            name='Komentar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slika', models.ImageField(blank=True, null=True, upload_to='post_images/')),
                ('naslov', models.CharField(max_length=100)),
                ('opis', models.CharField(max_length=500)),
                ('vrijeme', models.TimeField(default=datetime.datetime(2025, 1, 27, 13, 15, 28, 732480))),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('teren_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.teren')),
                ('turnir_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.turnir')),
            ],
        ),
        migrations.CreateModel(
            name='TurnirPrijava',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('prihvaćena', 'Prijava prihvaćena'), ('pending', 'Prijava čeka potvrdu')], default='pending', max_length=11)),
                ('turnir', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.turnir')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vlasnik',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adresa', models.CharField(max_length=100)),
                ('slika', models.URLField(blank=True, null=True)),
                ('telefon', models.CharField(default='0999696969', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ZauzetiTermin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pocetak', models.DateTimeField()),
                ('kraj', models.DateTimeField()),
                ('cijena', models.DecimalField(decimal_places=2, max_digits=10)),
                ('teren', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.teren')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
