from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

ES_MASCULINO = 'masculino'
ES_FEMENINO = 'femenino'
GENERO_OPCIONES = (
    (ES_FEMENINO, 'Femenino'),
    (ES_MASCULINO, 'Masculino'),
)

ES_MENOR = 'menor'
ES_ADULTO = 'adulto'
TIPO_EDAD_OPCIONES = (
    (ES_MENOR, 'Menor'),
    (ES_ADULTO, 'Adulto'),
)

MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

# Create your models here.
class Persona(models.Model):
    dni = models.IntegerField(primary_key=True)
    apellido = models.CharField(max_length=30)
    nombre = models.CharField(max_length=30)
    genero = models.CharField(max_length=10, choices=GENERO_OPCIONES)
    tipo_edad = models.CharField(max_length=10, choices=TIPO_EDAD_OPCIONES)
    articulo = models.CharField(max_length=5, default='', editable=False)  # editable=False para evitar que se muestre en los formularios
    terminacion = models.CharField(max_length=5, default='', editable=False)
    constancia_a_solicitud = models.CharField(max_length=50, default='', editable=False)

    def __str__(self):
        return f'{self.dni} {self.apellido} {self.nombre}'
    
    def actualizar_segun_genero (self):
        if self.genero == ES_FEMENINO: 
            self.articulo = 'la'
            self.terminacion = 'a'
            self.constancia_a_solicitud = 'de la Sra.'
        elif self.genero == ES_MASCULINO:
            self.articulo = 'el'
            self.terminacion = 'o'
            self.constancia_a_solicitud = 'del Sr.'

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.title()
        self.apellido = self.apellido.title()
        print(f'valor de ES_MASCULINO: {ES_MASCULINO}')
        print(f'valor de ES_FEMENINO: {ES_FEMENINO}')
        print(f'self genero de {self} en MODELS antes de actualizar: {self.genero}')
        print(f'self constancia_a_solicitud de {self} en MODELS antes de actualizar: {self.constancia_a_solicitud}')
        self.actualizar_segun_genero()
        print(f'self genero de {self} en MODELS después de actualizar: {self.genero}')
        print(f'self constancia_a_solicitud de {self} en MODELS después de actualizar: {self.constancia_a_solicitud}')
        
        super().save(*args, **kwargs)

class Paciente(models.Model):
    id = models.AutoField(primary_key=True)
    persona_dni = models.ForeignKey(Persona, on_delete=models.CASCADE)
    internacion = models.DateField()
    externacion = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.persona_dni}'
    
    def save(self, *args, **kwargs):
        if not self.externacion:
            self.externacion = None
        super().save(*args, **kwargs)


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


# @receiver(pre_save, sender=Persona)
# def actualizar_campos_relacionados(sender, instance, **kwargs):
#     print(f'instance genero en SIGNALS adentro de MODELS: {instance.genero}')
#     if instance.genero == ES_FEMENINO: 
#         instance.articulo = 'la'
#         instance.terminacion = 'a'
#         instance.constancia_a_solicitud = 'de la Sra.'
#     elif instance.genero == ES_MASCULINO:
#         instance.articulo = 'el'
#         instance.terminacion = 'o'
#         instance.constancia_a_solicitud = 'del Sr.'