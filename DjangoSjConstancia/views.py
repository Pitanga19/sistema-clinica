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
        
    relaciones_objects = RelacionPacienteFamiliar.objects.all()
    relacion_familiares_html = ListarRelacionesFamiliares(relaciones_objects).obtener_html()
    
    constancias_objects = Constancia.objects.all()
    id_constancia_buscada = id_constancia_recibida
    
    if id_constancia_buscada == None:
        valores_constancia = '','','','','','','','','','','','',''
    else:
        valores_constancia = FiltrarConstancias(constancias_objects, id_constancia_buscada).obtener_valores()
    
    return render(request, 'new.html', {'pacientes_html': pacientes_html, 'relacion_familiares_html': relacion_familiares_html, 'valores_constancia':valores_constancia})


def new_submit(request):
    if request.method == 'POST':
        # Obtén los datos del formulario
        p_nombre = request.POST.get('p-name')
        p_apellido = request.POST.get('p-last')
        p_dni = request.POST.get('p-dni')
        p_genero = request.POST.get('p-genre')
        p_internacion = request.POST.get('p-admission')
        p_externacion = request.POST.get('p-exit')
        p_edad = request.POST.get('p-age')
        f_nombre = request.POST.get('f-name')
        f_apellido = request.POST.get('f-last')
        f_dni = request.POST.get('f-dni')
        f_genero = request.POST.get('f-genre')
        p_f_relacion = request.POST.get('f-relation')
        c_presentacion = request.POST.get('d-date')
        
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