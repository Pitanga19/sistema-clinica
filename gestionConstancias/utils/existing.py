class ConstanciaExistente:
    def __init__(self, constancia):
        self.constancia = constancia
        self.paciente = self.constancia.paciente_familiar.paciente
        self.familiar = self.constancia.paciente_familiar.familiar
        self.presentacion = self.constancia.presentacion
    
    def html_code(self):
        return f'''
    <div class="main__certificate">
    <div class="main__certificate-info">
    <span class="main__span" id="pacient">Paciente: <b class="main__b">{self.paciente}</b> </span>
    <span class="main__span" id="family">Familiar: <b class="main__b">{self.familiar}</b></span>
    <span class="main__span" id="date">Fecha: <b class="main__b">{self.presentacion}</b></span>
    </div>
    <div class="main__certificate-buttons-container">
    <button class="main__certificate-button edit" data-constancia-id="{self.constancia.id}" id="edit-{self.paciente.nombre}-{self.paciente.apellido}-{self.familiar.nombre}-{self.familiar.apellido}-{self.presentacion}"><i class="fa-solid fa-pen"></i><p class="main__icon-description">Editar</p></button>
    <button class="main__certificate-button print" id="print-{self.paciente.nombre}-{self.paciente.apellido}-{self.familiar.nombre}-{self.familiar.apellido}-{self.presentacion}"><i class="fa-solid fa-print"></i><p class="main__icon-description">Imprimir</p></button>
    </div>
    </div>''';
    
    # def existing(request):
    # # Obtener todas las instancias de Constancia
    # constancias = Constancia.objects.all()

    # # Variable para almacenar el HTML generado
    # html_constancias = ''

    # # Iterar sobre cada instancia de Constancia
    # for constancia in constancias:
    #     # Crear una instancia de ConstanciaExistente
    #     constancia_existente = ConstanciaExistente(constancia)

    #     # Generar el HTML y agregarlo a la variable html_constancias
    #     html_constancias += constancia_existente.html_code()
    # return render(request, 'existing.html', {'contenido': html_constancias})