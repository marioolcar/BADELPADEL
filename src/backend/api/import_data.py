import pandas as pd
from django.contrib.auth.models import User
from api.models import Note, Vlasnik, Igrac, Teren, Turnir, Post, Komentar, TurnirPrijava

def run():
    # Kreiranje superusera
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',  # Korisničko ime superusera
            email='admin@example.com',  # Email adresa superusera
            password='88888888'  # Lozinka superusera
        )
        print("Superuser 'admin' created.")
    else:
        print("Superuser 'admin' already exists.")


def citaj_csv_tablicu(csv_file_path):
    # Postavi putanju do CSV datoteke
    try:

        # Učitaj CSV u DataFrame
        df = pd.read_csv(csv_file_path)

        # Iteriraj kroz DataFrame
        for index, row in df.iterrows():
            # Dodavanje podataka u modele
            
            
            if not User.objects.filter(username=row['username']).exists():
                user = User.objects.create_user(
                    username=row['username'],
                    password=row['password'],
                    email=row['email']
                )
            else:
                print(f"Korisnik s imenom {row['username']} već postoji.")
            
            
            if 'note_title' in row and 'note_content' in row and 'note_author' in row:
                # Dodavanje Note modela
                author = User.objects.get(username=row['note_author'])
                note = Note(
                    title=row['note_title'],
                    content=row['note_content'],
                    author=author
                )
                note.save()

            if 'vlasnik_user' in row and 'vlasnik_telefon' in row:
                # Dodavanje Vlasnik modela
                user = User.objects.get(username=row['vlasnik_user'])
                vlasnik = Vlasnik(
                    user=user,
                    telefon=row['vlasnik_telefon'],
                    slika=row['vlasnik_slika'] if 'vlasnik_slika' in row else None
                )
                vlasnik.save()

            if 'igrac_user' in row and 'igrac_telefon' in row:
                # Dodavanje Igrac modela
                user = User.objects.get(username=row['igrac_user'])
                igrac = Igrac(
                    user=user,
                    telefon=row['igrac_telefon'],
                    slika=row['igrac_slika'] if 'igrac_slika' in row else None
                )
                igrac.save()

            if 'teren_grad' in row and 'teren_ulica' in row:
                # Dodavanje Teren modela
                vlasnik = User.objects.get(username=row['teren_vlasnik'])
                teren = Teren(
                    lokacija_grad=row['teren_grad'],
                    lokacija_ulica=row['teren_ulica'],
                    tip=row['teren_tip'],
                    vlasnik=vlasnik,
                    dostupni_termini=row['teren_dostupni_termini'],
                    slika=row['teren_slika'] if 'teren_slika' in row else None
                )
                teren.save()

            if 'turnir_naziv' in row and 'turnir_teren' in row:
                # Dodavanje Turnir modela
                teren = Teren.objects.get(lokacija_grad=row['turnir_teren'])
                organizator = User.objects.get(username=row['turnir_organizator'])
                turnir = Turnir(
                    naziv=row['turnir_naziv'],
                    teren=teren,
                    datum_pocetka=row['turnir_datum_pocetka'],
                    datum_kraja=row['turnir_datum_kraja'],
                    cijena_kotizacije=row['turnir_cijena_kotizacije'],
                    nagrade=row['turnir_nagrade'],
                    opis=row['turnir_opis'],
                    organizator=organizator,
                    otvorenost=row['turnir_otvorenost']
                )
                turnir.save()

            if 'post_user' in row and 'post_naslov' in row:
                # Dodavanje Post modela
                user = User.objects.get(username=row['post_user'])
                teren = Teren.objects.get(id=row['post_teren']) if 'post_teren' in row else None
                turnir = Turnir.objects.get(id=row['post_turnir']) if 'post_turnir' in row else None
                post = Post(
                    user_id=user,
                    teren_id=teren,
                    turnir_id=turnir,
                    naslov=row['post_naslov'],
                    opis=row['post_opis'],
                    slika=row['post_slika'] if 'post_slika' in row else None
                )
                post.save()

            if 'komentar_user' in row and 'komentar_naslov' in row:
                # Dodavanje Komentar modela
                user = User.objects.get(username=row['komentar_user'])
                teren = Teren.objects.get(id=row['komentar_teren']) if 'komentar_teren' in row else None
                turnir = Turnir.objects.get(id=row['komentar_turnir']) if 'komentar_turnir' in row else None
                post = Post.objects.get(id=row['komentar_post']) if 'komentar_post' in row else None
                komentar = Komentar(
                    user_id=user,
                    teren_id=teren,
                    turnir_id=turnir,
                    post_id=post,
                    naslov=row['komentar_naslov'],
                    opis=row['komentar_opis'],
                    slika=row['komentar_slika'] if 'komentar_slika' in row else None
                )
                komentar.save()

            if 'prijava_user' in row and 'prijava_turnir' in row:
                # Dodavanje TurnirPrijava modela
                user = User.objects.get(username=row['prijava_user'])
                turnir = Turnir.objects.get(id=row['prijava_turnir'])
                prijava = TurnirPrijava(
                    user=user,
                    turnir=turnir
                )
                prijava.save()

        print("Podaci su uspješno uvezeni u bazu podataka!")
    except:
        pass
    
csv_file_path = 'api/example_podatci/podatci_prazno.csv'
citaj_csv_tablicu(csv_file_path)
