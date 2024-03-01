from django.db import models
from gestionConstancias.utils.new_submit import *

# Create your models here.
class Persona(models.Model):
    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    genero = models.CharField(max_length=10, choices=GENERO_OPCIONES)
    tipo_edad = models.CharField(max_length=10, choices=TIPO_EDAD_OPCIONES)

    def __str__(self):
        return f'{self.dni} {self.apellido} {self.nombre}'


class Paciente(models.Model):
    id = models.AutoField(primary_key=True)
    persona_dni = models.ForeignKey(Persona, on_delete=models.CASCADE)
    internacion = models.DateField()
    externacion = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.persona_dni}'
    

class RelacionPacienteFamiliar(models.Model):
    paciente_id = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    persona_dni = models.ForeignKey(Persona, on_delete=models.CASCADE)
    vinculo = models.CharField(max_length=100)
    class Meta:
        # Define la clave primaria compuesta
        constraints = [
            models.UniqueConstraint(fields=['paciente_id', 'persona_dni'], name='pk_relacion_compuesta')
        ]
    
    def __str__(self):
        return f'Paciente: {self.paciente_id} ({self.vinculo}) - Familiar: {self.persona_dni}'

class Constancia(models.Model):
    id = models.AutoField(primary_key=True)
    relacion_paciente_familiar_id = models.ForeignKey(RelacionPacienteFamiliar, on_delete=models.CASCADE)
    presentacion = models.DateField()
    
    def __str__(self):
        return f'{self.relacion_paciente_familiar_id} - Presentación: {self.presentacion}'