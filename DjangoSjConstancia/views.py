from django.http import HttpResponse
# importando el método render para simplificar el renderizado de la página
from django.shortcuts import render
from django.http import JsonResponse
from gestionConstancias.models import Persona, Paciente, RelacionPacienteFamiliar, Constancia
from gestionConstancias.utils.new import *
from gestionConstancias.utils.new_submit import *

import datetime


def index(request):
    # retornando el render con dos parámetros ya que no tiene contexto
    return render (request, 'index.html')


def new(request):
# la vista new no está recibiendo el parámetro id_constancia_recibida
    pacientes_objects = Paciente.objects.all()
    pacientes_html = ListarPacientes(pacientes_objects).obtener_html()
        
    familiares_objects = Persona.objects.all()
    familiares_html = ListarFamiliares(familiares_objects).obtener_html()
        
    relaciones_objects = RelacionPacienteFamiliar.objects.all()
    relaciones_familiares_html = ListarRelacionesFamiliares(relaciones_objects).obtener_html()
    
    return render(request, 'new.html', {
        'pacientes_html': pacientes_html,
        'familiares_html':familiares_html,
        'relaciones_familiares_html': relaciones_familiares_html
    })


def new_submit(request):
    if request.method == 'POST':
        # Obtén los datos del formulario
        paciente_dni = request.POST.get('paciente_dni')
        paciente_nombre = request.POST.get('paciente_nombre')
        paciente_apellido = request.POST.get('paciente_apellido')
        paciente_genero = request.POST.get('paciente_genero')
        paciente_tipo_edad = request.POST.get('paciente_tipo_edad')
        paciente_internacion = request.POST.get('paciente_internacion')
        paciente_externacion = request.POST.get('paciente_externacion')
        familiar_dni = request.POST.get('familiar_dni')
        familiar_nombre = request.POST.get('familiar_nombre')
        familiar_apellido = request.POST.get('familiar_apellido')
        familiar_genero = request.POST.get('familiar_genero')
        relacion_vinculo = request.POST.get('relacion_paciente_familiar')
        constancia_presentacion = request.POST.get('presentacion')
        
        paciente = obtener_paciente(paciente_dni, paciente_nombre, paciente_apellido, paciente_genero, paciente_tipo_edad, paciente_internacion, paciente_externacion)
        
        familiar = obtener_familiar(familiar_dni, familiar_nombre, familiar_apellido, familiar_genero)
        
        relacion = obtener_relacion(paciente, familiar, relacion_vinculo)
        
        constancia = obtener_constancia(relacion, constancia_presentacion)

        print(ModConstancia(constancia).contenido)
        
        contenido = ModConstancia(constancia).contenido

        # Redirecciona a una página de éxito o muestra un mensaje de éxito
        return render(request, 'membrete.html', {'contenido': contenido})
    else:
        # Si la solicitud no es POST, devuelve un error
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def membrete(request):
    return render (request, 'membrete.html')