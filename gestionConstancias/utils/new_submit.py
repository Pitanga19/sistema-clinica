ES_MASCULINO = 'masculino'
ES_FEMENINO = 'femenino'
ES_MENOR = 'menor'
ES_ADULTO = 'adulto'
MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']


class ModFecha:
    def __init__(self, fecha):
        self.fecha = str(fecha)
        self.splited = self.fecha.split('-')
        self.anio = int(self.splited[0])
        self.mes = int(self.splited[1])
        self.dia = int(self.splited[2])
        self.numero = self.fecha_numero()
        self.texto = self.fecha_texto()
    
    def fecha_numero(self):
        return f'{self.dia}/{self.mes}/{self.anio}'
    
    def fecha_texto(self):
        return f'{self.dia} de {MESES[self.mes -1]} de {self.anio}'


class ModDni:
    def __init__(self, dni):
        self.dni_str = str(dni)
        self.miles = self.dni_miles()
        
    def dni_miles(self):
        return f'{self.dni_str[:-6]}.{self.dni_str[-6:-3]}.{self.dni_str[-3:]}'


class Persona:
    def __init__(self, nombre, apellido, dni, genero):
        self.nombre = nombre.upper()
        self.apellido = apellido.upper()
        self.apellido_nombre = f'{self.apellido} {self.nombre}'
        self.dni = dni
        self.genero = genero.lower()
        self.definir_articulos()
    
    def __str__(self):
        return f'{self.apellido} {self.nombre} - D.N.I: {ModDni(self.dni).miles}'
    
    def definir_articulos(self):
        if self.genero == ES_MASCULINO: self.articulo = 'el'
        elif self.genero == ES_FEMENINO: self.articulo = 'la'


class ClasePaciente(Persona):
    def __init__(self, nombre, apellido, dni, genero, internacion, externacion, edad):
        Persona.__init__(self, nombre, apellido, dni, genero)
        self.internacion = internacion
        self.externacion = externacion
        self.edad = edad.lower()
        self.definir_terminacion()
    
    def definir_terminacion(self):
        if self.genero == ES_MASCULINO:
            self.terminacion = 'o'           
        elif self.genero == ES_FEMENINO:
            self.terminacion = 'a'


class ClaseFamiliar(Persona):
    def __init__(self, nombre, apellido, dni, genero):
        Persona.__init__(self, nombre, apellido, dni, genero)
        self.definir_prefijo()
    
    def definir_prefijo(self):
        if self.genero == ES_MASCULINO:
            self.prefijo = 'l Sr.'           
        elif self.genero == ES_FEMENINO:
            self.prefijo = ' la Sra.'


class ClaseRelacion:
    def __init__(self, paciente, familiar, vinculo):
        self.paciente = paciente
        self.familiar = familiar
        self.vinculo = vinculo


class ClaseConstancia:
    def __init__(self, relacion, fecha):
        self.relacion = relacion
        self.paciente = self.relacion.paciente
        self.familiar = self.relacion.familiar
        self.fecha = fecha
        self.contenido = f'{self.redactar_inicio()}{self.redactar_desarrollo()}{self.redactar_final()}'

    def __str__(self):
        return f'Paciente: {self.paciente.nombre} - Familiar: {self.familiar.nombre} - Presentación: {ModFecha(self.fecha.presentacion).numero}'
    
    def redactar_inicio(self):
        return f'<p class="contenido__fecha-presentacion">Lanús, {ModFecha(self.fecha).texto}.</p><br><p class="contenido__p">Se deja constancia que {self.paciente.articulo} paciente <b class="contenido__b">{self.paciente.apellido_nombre} DNI {ModDni(self.paciente.dni).miles}</b> '
    
    def redactar_desarrollo(self):
        if self.paciente.externacion == None: 
            return f'se encuentra internad{self.paciente.terminacion} en esta institución desde el día {ModFecha(self.paciente.internacion).numero}.</p>'
        else:
            return f'cursó internación en esta institución desde el día {ModFecha(self.paciente.internacion).numero} hasta el día {ModFecha(self.paciente.externacion).numero}.</p>'
    
    def redactar_final(self):
        return f'<br><p class="contenido__p">La presente se extiende a pedido de{self.familiar.prefijo} <b class="contenido__b">{self.familiar.apellido} {self.familiar.nombre} DNI {ModDni(self.familiar.dni).miles}</b>{self.redactar_extra()}.</p>'

    def redactar_extra(self):
        if self.paciente.edad == ES_ADULTO:
            extra = ''
        elif self.paciente.externacion == None:
            extra = f', quien se encuentra acompañando a su {self.relacion.vinculo} de manera continua'
        else:
            extra = f', quien acompañó a su {self.relacion.vinculo} de manera continua'
        return extra

def generar_paciente(nombre, apellido, dni, genero, internacion, externacion, edad):
    return ClasePaciente(nombre, apellido, dni, genero, internacion, externacion, edad)

def generar_familiar(nombre, apellido, dni, genero):
    return ClaseFamiliar(nombre, apellido, dni, genero)

def generar_relacion(paciente, familiar, relacion):
    return ClaseRelacion(paciente, familiar, relacion)

def generar_constancia(relacion, fecha):
    return ClaseConstancia(relacion, fecha)


class PersonaBBDD:
    def __init__(self, personas_objects, dni, nombre, apellido, genero):
        self.personas_objects = personas_objects
        self.dni = dni
        self.nombre = nombre
        self.apellido = apellido
        self.genero = genero
    
    def obtener(self):
        pass

class PacienteBBDD(PersonaBBDD):
    def __init__(self, personas_objects, dni, nombre, apellido, genero, internacion, externacion, edad):
        PersonaBBDD.__init__(self, personas_objects, nombre, apellido, dni, genero)
        self.personas_objects = personas_objects
        self.dni = dni
        self.nombre = nombre
        self.apellido = apellido
        self.genero = genero
        self.internacion = internacion
        self.externacion = externacion
        self.edad = edad
    
    def obtener(self):
        # Crea instancias de los modelos y guarda los datos en la base de datos
        if self.personas_objects.filter(dni=self.dni).exists():
            paciente = self.personas_objects.get(dni=self.dni)
            print(f"Ya existe el paciente con DNI {paciente.dni} ({paciente}).")
        else:
            paciente = self.personas_objects.create(
                dni=self.dni,
                nombre=self.nombre,
                apellido=self.apellido,
                genero=self.genero,
                internacion=self.internacion,
                externacion=self.externacion,
                edad=self.edad
            )
            print(f"Paciente agregado a la base de datos: {paciente}")
        return paciente


class FamiliarBBDD(PersonaBBDD):
    def __init__(self, personas_objects, dni, nombre, apellido, genero):
        PersonaBBDD.__init__(self, personas_objects, dni, nombre, apellido, genero)
    
    def obtener(self):
        # Crea instancias de los modelos y guarda los datos en la base de datos
        if self.personas_objects.filter(dni=self.dni).exists():
            familiar = self.personas_objects.get(dni=self.dni)
            print(f"Ya existe el familiar con DNI {familiar.dni} ({familiar}).")
        else:
            familiar = self.personas_objects.create(
                dni=self.dni,
                nombre=self.nombre,
                apellido=self.apellido,
                genero=self.genero
            )
            print(f"Familiar agregado a la base de datos: {familiar}")
        return familiar

class RelacionesBBDD:
    def __init__(self, relaciones_objects, paciente, familiar, relacion):
        self.relaciones_objects = relaciones_objects
        self.paciente = paciente
        self.familiar = familiar
        self.relacion = relacion
    
    def obtener(self):
        if self.relaciones_objects.filter(paciente__dni=self.paciente.dni, familiar__dni=self.familiar.dni).exists():
            relacion_paciente_familiar = self.relaciones_objects.get(paciente__dni=self.paciente.dni, familiar__dni=self.familiar.dni)
            print(f"La relación entre el paciente con DNI {self.paciente.dni} y el familiar con DNI {self.familiar.dni} ya existe.")
        else:
            relacion_paciente_familiar = self.relaciones_objects.create(
                paciente=self.paciente,
                familiar=self.familiar,
                relacion=self.relacion
            )
            print(f"Relación agregada a la base de datos: {self.paciente} y {self.familiar}")
        return relacion_paciente_familiar


class ConstanciaBBDD:
    def __init__(self, constancias_objects, relacion_paciente_familiar, presentacion):
        self.constancias_objects = constancias_objects
        self.relacion_paciente_familiar = relacion_paciente_familiar
        self.presentacion = presentacion
    
    def obtener(self):
        if self.constancias_objects.filter(paciente_familiar=self.relacion_paciente_familiar).exists():
            constancia = self.constancias_objects.get(paciente_familiar=self.relacion_paciente_familiar)
            constancia.presentacion = self.presentacion
            constancia.save()
            print(f"Se ha modificado la presentación de la constancia {constancia}.")
        else:
            constancia = self.constancias_objects.create(
                paciente_familiar=self.relacion_paciente_familiar,
                presentacion=self.presentacion
            )
            print(f"Se ha creado la constancia {constancia}.")
        return constancia