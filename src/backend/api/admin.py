from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Vlasnik)
admin.site.register(Igrac)
admin.site.register(Note)
admin.site.register(Teren)
admin.site.register(Turnir)

