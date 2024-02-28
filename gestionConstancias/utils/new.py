class ListarPacientes:
    def __init__(self, lista_pacientes_objects):
        self.lista_pacientes_objects = lista_pacientes_objects
    
    def obtener_html(self):
        pacientes_html = ""
        for paciente in self.lista_pacientes_objects:
            externacion = paciente.externacion.strftime('%Y-%m-%d') if paciente.externacion else "null"
            pacientes_html += f'''
            <li class="invisible" data-dni="{paciente.dni}" data-nombre="{paciente.nombre}" data-apellido="{paciente.apellido}" 
                data-genero="{paciente.genero}" data-internacion="{paciente.internacion}" 
                data-externacion="{externacion}" data-edad="{paciente.edad}">
                {paciente.nombre} {paciente.apellido} ({paciente.dni})
            </li>
            '''
        return pacientes_html

class ListarRelacionesFamiliares:
    def __init__(self, lista_relaciones_familiares_objects):
        self.lista_relaciones_familiares_objects = lista_relaciones_familiares_objects
    
    def obtener_html(self):
        relaciones_familiares_html = ""
        for relacion in self.lista_relaciones_familiares_objects:
            dni_paciente_relacionado = relacion.paciente.dni
            familiar = relacion.familiar
            relacion = relacion.relacion
            relaciones_familiares_html += f'''
            <li class="invisible" data-dni="{familiar.dni}" data-nombre="{familiar.nombre}" data-apellido="{familiar.apellido}" 
                data-genero="{familiar.genero}" data-relacion="{relacion}" data-paciente-relacionado="{dni_paciente_relacionado}">
                {familiar.nombre} {familiar.apellido} ({familiar.dni})
            </li>
            '''
        return relaciones_familiares_html

class FiltrarConstancias:
    def __init__(self, lista_constancias_objects, id_constancia_buscada):
        self.lista_constancias_objects = lista_constancias_objects
        self.id_constancia_buscada = id_constancia_buscada
        self.constancia_filtrada = self.obtener()
    
    def obtener(self):
        return self.lista_constancias_objects.get(id=self.id_constancia_buscada)
    
    def obtener_valores(self):
        paciente_dni = self.constancia_filtrada.paciente_familiar.paciente.dni
        paciente_nombre = self.constancia_filtrada.paciente_familiar.paciente.nombre
        paciente_apellido = self.constancia_filtrada.paciente_familiar.paciente.apellido
        paciente_genero = self.constancia_filtrada.paciente_familiar.paciente.genero
        paciente_internacion = self.constancia_filtrada.paciente_familiar.paciente.internacion
        paciente_externacion = self.constancia_filtrada.paciente_familiar.paciente.externacion
        paciente_edad = self.constancia_filtrada.paciente_familiar.paciente.edad
        familiar_dni = self.constancia_filtrada.paciente_familiar.familiar.dni
        familiar_nombre = self.constancia_filtrada.paciente_familiar.familiar.nombre
        familiar_apellido = self.constancia_filtrada.paciente_familiar.familiar.apellido
        familiar_genero = self.constancia_filtrada.paciente_familiar.familiar.genero
        relacion = self.constancia_filtrada.paciente_familiar.relacion
        presentacion = self.constancia_filtrada.presentacion
        return paciente_dni, paciente_nombre, paciente_apellido, paciente_genero, paciente_internacion, paciente_externacion, paciente_edad, familiar_dni, familiar_nombre, familiar_apellido, familiar_genero, relacion, presentacion