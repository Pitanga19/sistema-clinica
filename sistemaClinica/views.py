from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from gestionConstancias.models import Persona, Paciente, RelacionPacienteFamiliar, Constancia
from gestionConstancias.utils.constancias import *
from gestionConstancias.utils.constancias_submit import *
from datetime import datetime


def index(request):
    # retornando el render con dos parámetros ya que no tiene contexto
    return render (request, 'index.html')


def constancias(request):
    fecha_actual = datetime.now().date()
    
    pacientes_objects = Paciente.objects.all()
    pacientes_html = ListarPacientes(pacientes_objects).obtener_html()
    
    personas_no_paciente_objects = Persona.objects.exclude(dni__in=Paciente.objects.values('persona_dni'))
    personas_no_paciente_html = ListarPersonasNoPaciente(personas_no_paciente_objects).obtener_html()
    
    familiares_objects = Persona.objects.all()
    familiares_html = ListarFamiliares(familiares_objects).obtener_html()
    
    relaciones_objects = RelacionPacienteFamiliar.objects.all()
    relaciones_familiares_html = ListarRelacionesFamiliares(relaciones_objects).obtener_html()
    
    return render(request, 'constancias.html', {
        'pacientes_html': pacientes_html,
        'personas_no_paciente_html': personas_no_paciente_html,
        'familiares_html':familiares_html,
        'relaciones_familiares_html': relaciones_familiares_html,
        'fecha_actual': fecha_actual
    })


def constancias_submit(request):
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
        constancias_presentacion = request.POST.get('presentacion')
        
        paciente = obtener_paciente(paciente_dni, paciente_apellido, paciente_nombre, paciente_genero, paciente_tipo_edad, paciente_internacion, paciente_externacion)
        
        familiar = obtener_familiar(familiar_dni, familiar_apellido, familiar_nombre, familiar_genero)
        
        relacion = obtener_relacion(paciente, familiar, relacion_vinculo)
        
        constancias = obtener_constancia(relacion, constancias_presentacion)
        
        contenido = ModConstancia(constancias).contenido

        # Redirecciona a una página de éxito o muestra un mensaje de éxito
        return render(request, 'membrete.html', {'contenido': contenido})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def membrete(request):
    return render (request, 'membrete.html')