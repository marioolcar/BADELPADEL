# Programsko inženjerstvo

> Ime projekta u naslovu ima cilj opisati namjenu projekta te pomoći u podizanju početnog interesa za projekt prezentirajući osnovnu svrhu projekta.
> Isključivo ovisi o Vama!
>
> Naravno, nijedan predložak nije idealan za sve projekte jer su potrebe i ciljevi različiti. Ne bojte se naglasiti Vaš cilj u ovoj početnoj stranici projekta, podržat ćemo ga bez obzira usredotočili se Vi više na tenologiju ili marketing.
>
> Zašto ovaj dokument? Samo manji dio timova je do sada propoznao potrebu (a i meni je lakše pratiti Vaš rad).

# Opis projekta

Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.

Kratko opisati cilj Vašeg projekta. Vaša motivacija?  (Napomena: odgovor nije »Zato što je to bio zadatak i nismo imali ideje za drugo.«). Koji problem rješavate?

> Obzirom da je ovo zadani projekt navedite i što želite/jeste novo  naučili.

> Dobro izrađen opis omogućuje vam da pokažete svoj rad drugim programerima, kao i potencijalnim poslodavcima. Ne samo da prvi dojam na stranici opisa često razlikuje dobar projekt od lošeg projekta već i predstavlja dobru praksu koju morate savladati.

# Funkcijski zahtjevi

1. **Registracija korisnika**:

   - Korisnici se moraju registrirati kao **igrači** ili **vlasnici terena**.
   - Igrači koriste platformu besplatno, dok vlasnici terena plaćaju godišnju članarinu.
2. **Podjela korisnika na vlasnike terena i igrače**:

   - Vlasnici terena imaju javni profil koji sadrži osnovne informacije (naziv, adresa, kontakt telefon).
   - Vlasnici mogu oglašavati terene i turnire na svojim profilima.
   - Igrači mogu objavljivati komentare i slike turnira na kojima su sudjelovali
3. **Upravljanje i rezervacija terena**:

   - Vlasnici mogu postaviti detalje za svaki teren (lokacija, slika, tip terena, termini, cijena).
   - Kalendar rezervacija koristi vanjske usluge Google kalendara
   - Igrači mogu pregledavati dostupne termine i rezervirati teren putem platforme.
   - Plaćanje može biti gotovinom, PayPal-om ili kreditnom karticom.
   - Moguće je otkazati rezervaciju do 24 sata prije početka termina.
4. **Praćenje rezultata i događaja**:

   - Vlasnici terena mogu unijeti rezultate završenih turnira te postaviti fotografije s turnira.
   - Igrači mogu postavljati komentare i slike vezane uz odigrane mečeve.

# Nefunkcionalni zahtjevi

1. **Sigurnost**:

   - Svi podaci o korisnicima moraju biti zaštićeni enkripcijom.
   - Plaćanja moraju koristiti sigurnosne protokole (SSL/TLS) i integrirati se s vanjskim, sigurnim servisima (PayPal, sustavi kreditnih kartica).
2. **Performanse**:

   - Sustav mora omogućiti brzo učitavanje i pregled rezervacija, čak i uz veći broj korisnika i podataka.
   - Platforma mora biti skalabilna kako bi mogla podržati povećanje broja korisnika i rezervacija.
3. **Dostupnost**:

   - Platforma mora biti dostupna 24/7 s minimalnim vremenom zastoja.
4. **Kompatibilnost**:

   - Aplikacija mora biti dostupna i optimizirana za različite uređaje (mobilni telefoni, tableti, desktop računala).
   - Kalendar rezervacija treba biti kompatibilan s popularnim uslugama kao što su Google Kalendar i Calendar.online.
5. **Jednostavnost korištenja**:

   - Korisničko sučelje mora biti intuitivno i jednostavno za upotrebu za sve tipove korisnika (igrači, vlasnici terena, administratori).
6. **Skalabilnost**:

   - Sustav mora podržavati dodavanje novih funkcionalnosti bez narušavanja postojećih performansi.
7. **Pouzdanost**:

   - Sustav mora osigurati točne i konzistentne podatke o rezervacijama, plaćanjima i turnirima.
8. **Privatnost**:

   - Podaci o igračima i vlasnicima terena ne smiju se dijeliti s trećim stranama bez njihovog pristanka, u skladu s propisima o zaštiti podataka (GDPR).
9. **Integracija s vanjskim servisima**:

   - Platforma mora omogućiti integraciju s vanjskim kalendarima (Google Kalendar, Calendar.online) i servisima za plaćanje (PayPal, sustavi kreditnih kartica).
10. **Održavanje**:

- Sustav mora biti lako održiv, s jasnim dokumentacijama za administratore i tehničku podršku.

# Tehnologije

#Instalcija

# Članovi tima

> Popis članova tima/linkovi/ glavni doprinos

# Kontribucije

> Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md

# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.

> ### Poboljšajte funkcioniranje tima:
>
> * definirajte načina na koji će rad biti podijeljen među članovima grupe
> * dogovorite kako će grupa međusobno komunicirati.
> * ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
> * implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.

> ### Prijava problema
>
> Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>
> * Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
> * Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
> * Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca

Važeča (1)
[CC BY-NC-SA 4.0][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].

> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[CC BY-NC-SA 4.0][cc-by-nc-sa]

Orginal [cc0-1.0][cc0-1.0]

> COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.

[CC0-1.0][cc0-1.0]

### Reference na licenciranje repozitorija

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg
