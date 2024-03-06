from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from datetime import datetime
from .models import Persona, Paciente
from .utils.constancias_submit import *

@receiver(pre_save, sender=Persona)
def actualizar_campos_relacionados(sender, instance, **kwargs):
    print(f'instance genero en SIGNALS: {instance.genero}')
    if instance.genero == ES_FEMENINO: 
        instance.articulo = 'la'
        instance.terminacion = 'a'
        instance.constancia_a_solicitud = 'de la Sra.'
    elif instance.genero == ES_MASCULINO:
        instance.articulo = 'el'
        instance.terminacion = 'o'
        instance.constancia_a_solicitud = 'del Sr.'


# @receiver(pre_save, sender=Paciente)
# def pre_save_paciente(sender, instance, **kwargs):
#     if not instance.externacion: instance.externacion = None
#     instance.save()