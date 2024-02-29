from django.http import HttpResponse
# importando el método render para simplificar el renderizado de la página
from django.shortcuts import render
from django.http import JsonResponse
from gestionConstancias.models import Paciente, Familiar, RelacionPacienteFamiliar, Constancia
from gestionConstancias.utils.new import *
from gestionConstancias.utils.new_submit import *

import datetime


def index(request):
    # retornando el render con dos parámetros ya que no tiene contexto
    return render (request, 'index.html')


def new(request, id_constancia_recibida=None):
# la vista new no está recibiendo el parámetro id_constancia_recibida
    pacientes_objects = Paciente.objects.all()
    pacientes_html = ListarPacientes(pacientes_objects).obtener_html()
        
    familiares_objects = Familiar.objects.all()
    familiares_html = ListarFamiliares(familiares_objects).obtener_html()
        
    relaciones_objects = RelacionPacienteFamiliar.objects.all()
    relaciones_familiares_html = ListarRelacionesFamiliares(relaciones_objects).obtener_html()
    
    constancias_objects = Constancia.objects.all()
    id_constancia_buscada = id_constancia_recibida
    
    if id_constancia_buscada == None:
        valores_constancia = '','','','','','','','','','','','',''
    else:
        valores_constancia = FiltrarConstancias(constancias_objects, id_constancia_buscada).obtener_valores()
    
    return render(request, 'new.html', {'pacientes_html': pacientes_html, 'familiares_html':familiares_html, 'relaciones_familiares_html': relaciones_familiares_html, 'valores_constancia':valores_constancia})


def new_submit(request):
    if request.method == 'POST':
        # Obtén los datos del formulario
        p_dni = request.POST.get('paciente_dni')
        p_nombre = request.POST.get('paciente_nombre')
        p_apellido = request.POST.get('paciente_apellido')
        p_genero = request.POST.get('paciente_genero')
        p_internacion = request.POST.get('paciente_internacion')
        p_externacion = request.POST.get('paciente_externacion')
        p_edad = request.POST.get('paciente_tipo_edad')
        f_dni = request.POST.get('familiar_dni')
        f_nombre = request.POST.get('familiar_nombre')
        f_apellido = request.POST.get('familiar_apellido')
        f_genero = request.POST.get('familiar_genero')
        p_f_relacion = request.POST.get('relacion_paciente_familiar')
        c_presentacion = request.POST.get('presentacion')
        
        pacientes_objects = Paciente.objects
        paciente = PacienteBBDD(pacientes_objects, p_dni, p_nombre, p_apellido, p_genero, p_internacion, p_externacion, p_edad).obtener()

        familiares_objects = Familiar.objects
        familiar = FamiliarBBDD(familiares_objects, f_dni, f_nombre, f_apellido, f_genero).obtener()

        relaciones_objects = RelacionPacienteFamiliar.objects
        relacion_paciente_familiar = RelacionesBBDD(relaciones_objects, paciente, familiar, p_f_relacion)
        
        constancias_objects = Constancia.objects
        constancia = ConstanciaBBDD(constancias_objects, relacion_paciente_familiar, c_presentacion)
        
        obj_paciente = generar_paciente(paciente.nombre, paciente.apellido, paciente.dni, paciente.genero, paciente.internacion, paciente.externacion, paciente.edad)
        obj_familiar = generar_familiar(familiar.nombre, familiar.apellido, familiar.dni, familiar.genero)
        
        obj_relacion = generar_relacion(obj_paciente, obj_familiar, relacion_paciente_familiar.relacion)
        obj_constancia = generar_constancia(obj_relacion, constancia.presentacion)
        
        print(obj_constancia.contenido)

        # Redirecciona a una página de éxito o muestra un mensaje de éxito
        return render(request, 'membrete.html', {'contenido': obj_constancia.contenido})
    else:
        # Si la solicitud no es POST, devuelve un error
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def membrete(request):
    return render (request, 'membrete.html')