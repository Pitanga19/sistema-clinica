from django.contrib import admin

from gestionConstancias.models import Persona, Paciente, RelacionPacienteFamiliar, Constancia

# class PersonaAdmin(admin.ModelAdmin):
#     list_display = ('dni', 'apellido', 'nombre', 'genero', 'tipo_edad')
#     search_fields = ('dni', 'apellido', 'nombre')

# class PacienteAdmin(admin.ModelAdmin):
#     list_display = ('get_dni', 'get_apellido', 'get_nombre', 'internacion', 'externacion')
#     search_fields = ('persona_dni__dni', 'persona_dni__apellido', 'persona_dni__nombre', 'internacion', 'externacion')
#     list_filter = ('internacion','externacion')

#     def get_dni(self, obj):
#         return obj.persona_dni.dni

#     def get_apellido(self, obj):
#         return obj.persona_dni.apellido

#     def get_nombre(self, obj):
#         return obj.persona_dni.nombre

#     get_dni.short_description = 'DNI'
#     get_apellido.short_description = 'Apellido'
#     get_nombre.short_description = 'Nombre'

# class RelacionAdmin(admin.ModelAdmin):
#     list_display = ('get_paciente_dni', 'vinculo', 'get_persona_dni')
#     search_fields = ('paciente_id__persona_dni__dni', 'paciente_id__persona_dni__apellido', 'paciente_id__persona_dni__nombre', 'persona_dni__dni', 'persona_dni__apellido', 'persona_dni__nombre')

#     def get_paciente_dni(self, obj):
#         return obj.paciente_id.persona_dni.dni

#     def get_persona_dni(self, obj):
#         return obj.persona_dni.dni

#     get_paciente_dni.short_description = 'DNI Paciente'
#     get_persona_dni.short_description = 'DNI Persona'
    
# class ConstanciaAdmin(admin.ModelAdmin):
#     search_fields = ('relacion_paciente_familiar_id__paciente_id__persona_dni__dni', 'relacion_paciente_familiar_id__paciente_id__persona_dni__apellido', 'relacion_paciente_familiar_id__paciente_id__persona_dni__nombre', 'relacion_paciente_familiar_id__persona_dni__dni', 'relacion_paciente_familiar_id__persona_dni__apellido', 'relacion_paciente_familiar_id__persona_dni__nombre')


# Register your models here.
# admin.site.register(Persona, PersonaAdmin)
# admin.site.register(Paciente, PacienteAdmin)
# admin.site.register(RelacionPacienteFamiliar, RelacionAdmin)
# admin.site.register(Constancia, ConstanciaAdmin)