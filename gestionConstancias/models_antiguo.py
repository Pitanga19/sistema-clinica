from django.db import models

# Create your models here.

class Paciente(models.Model):
    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    genero = models.CharField(max_length=30)
    internacion = models.DateField(max_length=30)
    externacion = models.DateField(max_length=30, blank=True, null=True)
    edad = models.CharField(max_length=30, verbose_name='Adulto/Menor')
    
    def __str__(self):
        return f'{self.nombre} {self.apellido}'

class Familiar(models.Model):
    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    genero = models.CharField(max_length=30)
    
    def __str__(self):
        return f'{self.nombre} {self.apellido}'

class RelacionPacienteFamiliar(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)
    relacion = models.CharField(max_length=30)
    
    def __str__(self):
        return f'Paciente: {self.paciente} ({self.relacion}) - Familiar: {self.familiar}'

class Constancia(models.Model):
    id = models.AutoField(primary_key=True)
    paciente_familiar = models.ForeignKey(RelacionPacienteFamiliar, on_delete=models.CASCADE)
    presentacion = models.DateField()
    
    def __str__(self):
        return f'{self.paciente_familiar} - Presentación: {self.presentacion}'