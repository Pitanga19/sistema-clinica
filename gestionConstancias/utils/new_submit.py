from datetime import datetime
from gestionConstancias.models import Persona, Paciente, RelacionPacienteFamiliar, Constancia

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


class ModFecha:
    def __init__(self, fecha):
        self.fechaFormateada = self.obtener_datetime_formateado(fecha)
        self.anio = self.fechaFormateada.year
        self.mes = self.fechaFormateada.month
        self.dia = self.fechaFormateada.day
        self.numero = self.fecha_numero()
        self.texto = self.fecha_texto()

    def obtener_datetime_formateado(self, fecha):
        if isinstance(fecha, str):
            fechaDatetime = datetime.strptime(fecha, '%Y-%m-%d')
        else:
            fechaDatetime = fecha
        return fechaDatetime
    
    def fecha_numero(self):
        return self.fechaFormateada.strftime('%d/%m/%Y')
    
    def fecha_texto(self):
        mes_en_espanol = MESES[self.fechaFormateada.month - 1]
        return self.fechaFormateada.strftime('%d de {} de %Y'.format(mes_en_espanol))


class ModDni:
    def __init__(self, dni_int):
        self.dni_str = str(dni_int)
        self.miles = self.dni_miles()
        
    def dni_miles(self):
        return f'{self.dni_str[:-6]}.{self.dni_str[-6:-3]}.{self.dni_str[-3:]}'


class ModConstancia:
    def __init__(self, objeto_constancia):
        self.constancia = objeto_constancia
        self.relacion = self.constancia.relacion_paciente_familiar_id
        self.paciente = self.relacion.paciente_id.persona_dni
        self.paciente_fechas = self.relacion.paciente_id
        self.familiar = self.relacion.persona_dni
        self.contenido = f'{self.redactar_inicio()}{self.redactar_desarrollo()}{self.redactar_final()}'

    def __str__(self):
        return f'Paciente: {self.paciente} - Familiar: {self.familiar} - Presentación: {self.constancia.presentacion}'
    
    def redactar_inicio(self):
        return f'<p class="contenido__fecha-presentacion">Lanús, {ModFecha(self.constancia.presentacion).texto}.</p><br><p class="contenido__p">Se deja constancia que {self.paciente.articulo} paciente <b class="contenido__b">{self.paciente.apellido} {self.paciente.nombre} DNI {ModDni(self.paciente.dni).miles}</b> '
    
    def redactar_desarrollo(self):
        if not self.paciente_fechas.externacion:
            return f'se encuentra internad{self.paciente.terminacion} en esta institución desde el día {ModFecha(self.paciente_fechas.internacion).numero}.</p>'
        else:
            return f'cursó internación en esta institución desde el día {ModFecha(self.paciente_fechas.internacion).numero} hasta el día {ModFecha(self.paciente_fechas.externacion).numero}.</p>'
    
    def redactar_final(self):
        return f'<br><p class="contenido__p">La presente se extiende a pedido {self.familiar.constancia_a_solicitud} <b class="contenido__b">{self.familiar.apellido} {self.familiar.nombre} DNI {ModDni(self.familiar.dni).miles}</b>{self.redactar_extra()}.</p>'

    def redactar_extra(self):
        if self.paciente.tipo_edad == ES_ADULTO:
            extra = ''
        elif not self.paciente_fechas.externacion:
            extra = f', quien se encuentra acompañando a su {self.relacion.vinculo} de manera continua'
        else:
            extra = f', quien acompañó a su {self.relacion.vinculo} de manera continua'
        return extra


def obtener_paciente(dni, apellido, nombre, genero, tipo_edad, internacion, externacion):
    try:
        paciente = Paciente.objects.get(persona_dni=dni)
    except Paciente.DoesNotExist:
        try:
            persona = Persona.objects.get(dni=dni)
        except Persona.DoesNotExist:
            persona = Persona.objects.create(
                dni=dni,
                apellido=apellido,
                nombre=nombre,
                genero=genero,
                tipo_edad=tipo_edad
            )
    # persona, created = Persona.objects.get_or_create(
    #     dni=dni,
    #     defaults={
    #         'nombre': nombre,
    #         'apellido': apellido,
    #         'genero': genero,
    #         'tipo_edad': tipo_edad
    #     }
    # )

    # paciente, created = Paciente.objects.update_or_create(
    #     persona_dni=persona,
    #     defaults={
    #         'internacion': internacion,
    #         'externacion': externacion
    #     }
    # )

    #return paciente


# FUNCIÓN OBTENER FAMILIAR
def obtener_familiar(dni, nombre, apellido, genero, tipo_edad=ES_ADULTO):
    defaults = {
        'nombre': nombre,
        'apellido': apellido,
        'genero': genero,
        'tipo_edad': tipo_edad
    }

    persona, created = Persona.objects.update_or_create(
        dni=dni,
        defaults=defaults
    )

    return persona


# FUNCIÓN OBTENER RELACION
def obtener_relacion(paciente, familiar, vinculo):
    defaults = {
        'paciente_id': paciente,
        'persona_dni': familiar,
        'vinculo': vinculo
    }

    relacion, created = RelacionPacienteFamiliar.objects.update_or_create(
        paciente_id=paciente,
        persona_dni=familiar,
        defaults=defaults
    )

    return relacion


# FUNCIÓN OBTENER CONSTANCIA
def obtener_constancia(relacion, presentacion):
    defaults = {
        'presentacion': presentacion
    }

    constancia, created = Constancia.objects.update_or_create(
        relacion_paciente_familiar_id=relacion,
        defaults=defaults
    )

    return constancia


# FUNCIÓN OBTENER CONTENIDO A DEVOLVER
# retornar constancia.contenido