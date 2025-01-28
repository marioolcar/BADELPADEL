from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

all_permissions = {"add_logentry",
"change_logentry",
"delete_logentry",
"view_logentry",
"add_igrac",
"change_igrac",
"delete_igrac",
"view_igrac",
"add_komentar",
"change_komentar",
"delete_komentar",
"view_komentar",
"add_note",
"change_note",
"delete_note",
"view_note",
"add_post",
"change_post",
"delete_post",
"view_post",
"add_teren",
"change_teren",
"delete_teren",
"view_teren",
"add_termin",
"change_termin",
"delete_termin",
"view_termin",
"add_turnir",
"change_turnir",
"delete_turnir",
"view_turnir",
"add_turnirprijava",
"change_turnirprijava",
"delete_turnirprijava",
"view_turnirprijava",
"add_vlasnik",
"change_vlasnik",
"delete_vlasnik",
"view_vlasnik",
"add_zauzetitermin",
"change_zauzetitermin",
"delete_zauzetitermin",
"view_zauzetitermin",
"add_group",
"change_group",
"delete_group",
"view_group",
"add_permission",
"change_permission",
"delete_permission",
"view_permission",
"add_user",
"change_user",
"delete_user",
"view_user","view_vlasnik",
"delete_contenttype",
"view_contenttype",
"add_session",
"change_session",
"delete_session",
"view_session",
}

Group.objects.filter(name="Igraci").delete()
Group.objects.filter(name="Vlasnici").delete()
Group.objects.filter(name="Admins").delete()

igrac = Group.objects.create(name="Igraci")
vlasnik = Group.objects.create(name="Vlasnici")
admin = Group.objects.create(name="Admins")

igrac_permissions = { "add_zauzetitermin", "change_zauzetitermin", "delete_zauzetitermin", "view_zauzetitermin", \
        "view_vlasnik", \
            "add_turnirprijava", "change_turnirprijava", "delete_turnirprijava", "view_turnirprijava", \
                "view_turnir", \
                    "delete_termin", "view_termin", "add_termin", \
                        "view_teren", \
                            "add_post", "change_post", "delete_post", "view_post", \
                                "view_igrac",
}

vlasnik_permissions = {
    "view_igrac", \
        "add_post", "change_post", "delete_post", "view_post",\
            "add_teren", "change_teren", "delete_teren", "view_teren",\
                "add_termin", "change_termin", "delete_termin", "view_termin",\
                    "add_turnir", "change_turnir", "delete_turnir", "view_turnir",\
                         "add_turnirprijava", "change_turnirprijava", "delete_turnirprijava", "view_turnirprijava",\
                            "view_vlasnik",
}

for permission in igrac_permissions:
    igrac.permissions.add(Permission.objects.filter(codename=permission).first())

for permission in vlasnik_permissions:
    vlasnik.permissions.add(Permission.objects.filter(codename=permission).first())

for permission in  Permission.objects.all():
    admin.permissions.add(permission)

adminAccount = User.objects.create(username="admin", first_name="BadelPadel", email="badelpadel5@gmail.com", password="pass")
adminAccount.groups.add(Group.objects.get(name="Admins"))