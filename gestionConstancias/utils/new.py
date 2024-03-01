class ListarPacientes:
    def __init__(self, lista_pacientes_objects):
        self.lista_pacientes_objects = lista_pacientes_objects
    
    def obtener_html(self):
        pacientes_html = ""
        for paciente in self.lista_pacientes_objects:
            externacion = paciente.externacion.strftime('%Y-%m-%d') if paciente.externacion else "null"
            pacientes_html += f'''
            <li class="invisible" data-dni="{paciente.persona_dni.dni}" data-nombre="{paciente.persona_dni.nombre}" data-apellido="{paciente.persona_dni.apellido}" 
                data-genero="{paciente.persona_dni.genero}" data-internacion="{paciente.internacion}" 
                data-externacion="{externacion}" data-tipo-edad="{paciente.persona_dni.tipo_edad}">
                {paciente}
            </li>
            '''
        return pacientes_html
    
class ListarPersonasNoPaciente:
    def __init__(self, lista_personas_no_paciente_objects):
        self.lista_personas_no_paciente_objects = lista_personas_no_paciente_objects
    
    def obtener_html(self):
        personas_html = ""
        for persona in self.lista_personas_no_paciente_objects:
            personas_html += f'''
            <li class="invisible" data-dni="{persona.dni}" data-nombre="{persona.nombre}" data-apellido="{persona.apellido}" 
                data-genero="{persona.genero}" 
                data-tipo_edad="{persona.tipo_edad}">
                {persona}
            </li>
            '''
        return personas_html
    
class ListarFamiliares:
    def __init__(self, lista_familiares_objects):
        self.lista_familiares_objects = lista_familiares_objects
    
    def obtener_html(self):
        familiares_html = ""
        for familiar in self.lista_familiares_objects:
            familiares_html += f'''
            <li class="invisible" data-dni="{familiar.dni}" data-nombre="{familiar.nombre}" data-apellido="{familiar.apellido}" 
                data-genero="{familiar.genero}">
                {familiar}
            </li>
            '''
        return familiares_html

class ListarRelacionesFamiliares:
    def __init__(self, lista_relaciones_familiares_objects):
        self.lista_relaciones_familiares_objects = lista_relaciones_familiares_objects
    
    def obtener_html(self):
        relaciones_familiares_html = ""
        for relacion in self.lista_relaciones_familiares_objects:
            paciente_relacionado_dni = relacion.paciente_id.persona_dni.dni
            familiar = relacion.persona_dni
            vinculo = relacion.vinculo
            relaciones_familiares_html += f'''
            <li class="invisible" data-dni-paciente-relacionado="{paciente_relacionado_dni}" data-dni="{familiar.dni}" data-nombre="{familiar.nombre}" data-apellido="{familiar.apellido}" 
                data-genero="{familiar.genero}" data-vinculo="{vinculo}"">
                {familiar}
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