from django.contrib import admin

from gestionConstancias.models import Paciente, Familiar, RelacionPacienteFamiliar, Constancia

class PacienteAdmin(admin.ModelAdmin):
    list_display = ('dni', 'apellido', 'nombre', 'internacion', 'externacion', 'edad')
    search_fields = ('dni', 'apellido', 'nombre', 'internacion', 'externacion')
    list_filter = ('internacion','externacion')

class FamiliarAdmin(admin.ModelAdmin):
    list_display = ('dni', 'apellido', 'nombre')
    search_fields = ('dni', 'apellido', 'nombre')
    
class RelacionAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'relacion', 'familiar')
    search_fields = ('paciente__dni', 'paciente__apellido', 'paciente__nombre', 'familiar__dni', 'familiar__apellido', 'familiar__nombre')
    
class ConstanciaAdmin(admin.ModelAdmin):
    search_fields = ('paciente_familiar__paciente__dni', 'paciente_familiar__paciente__apellido', 'paciente_familiar__paciente__nombre', 'paciente_familiar__familiar__dni', 'paciente_familiar__familiar__apellido', 'paciente_familiar__familiar__nombre')

# Register your models here.
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(Familiar, FamiliarAdmin)
admin.site.register(RelacionPacienteFamiliar, RelacionAdmin)
admin.site.register(Constancia, ConstanciaAdmin)