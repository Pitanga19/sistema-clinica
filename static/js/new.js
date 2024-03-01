class Elemento {
    constructor(elementoHtml){
        this.html = elementoHtml;
    }

    agregarClase(clase) {
        this.html.classList.add(clase);
    }
    
    removerClases(...clases) {
        for (let clase of clases) {
            this.html.classList.remove(clase);
        }
    }
    
    ocultar(){
        this.agregarClase('invisible');
    }

    mostrar(){
        this.removerClases('invisible');
    }

    establecerValorAtributo(atributo, valor) {
        this.html.setAttribute(atributo, valor);
    }

    obtenerValorAtributo(atributo) {
        return this.html.getAttribute(atributo);
    }

    removerAtributo(atributo) {
        this.html.removeAttribute(atributo);
    }
}

class Input extends Elemento {
    constructor(elementoHtml){
        super(elementoHtml)
        this.valor = this.obtenerValor();
    }

    obtenerValor(){
        return this.html.value;
    }

    actualizarValor(nuevoValor) {
        this.html.value = nuevoValor;
    }
}

class Boton extends Elemento {
    constructor(elementoHtml){
        super(elementoHtml);
    }
    
    redireccionar(url) {
        window.location.href = url;
    }

    nuevaPestania(url) {
        window.open(url, '_blank');
    }

    seleccionar(botonDescartado) {
        this.html.classList.add('seleccionado');
        this.html.classList.remove('descartado');
    
        if (botonDescartado instanceof Boton) {
            botonDescartado.descartar();
        }
    }
    
    descartar(botonSeleccionado) {
        this.html.classList.add('descartado');
        this.html.classList.remove('seleccionado');
    
        if (botonSeleccionado instanceof Boton) {
            botonSeleccionado.seleccionar();
        }
    }

    resetear() {
        this.html.classList.remove('seleccionado');
        this.html.classList.remove('descartado');
    }

    ejecutarMetodoEnOtraInstancia(instanciaOtraClase, metodo) {
        instanciaOtraClase[metodo]();
    }
}

class ElementosArray {
    constructor(elementosHtmlArray) {
        this.elementosHtmlArray = Array.from(elementosHtmlArray);
        this.elementosInstanciadosArray = this.generarInstanciasElemento();
    }

    generarInstanciasElemento() {
        return (this.elementosHtmlArray.map(elementoHtml => new Elemento(elementoHtml)));
    }    

    generarInstanciasItemLista() {
        return this.elementosHtmlArray.map(elementoHtml => new ItemLista(elementoHtml));
    }    

    iterar(nombreMetodo, ...args) {
        this.elementosInstanciadosArray.forEach(elemento => {
            if (typeof elemento[nombreMetodo] === 'function') {
                elemento[nombreMetodo](...args);
            }
        });
    }
}

class ItemLista extends Elemento {
    constructor(elementoHtml) {
        super(elementoHtml);
        this.data = this.obtenerData();
    }

    obtenerData() {
        
    }
}

class Lista extends Elemento {
    constructor(elementoHtml) {
        super(elementoHtml);
        this.elementosArray = new ElementosArray(Array.from(elementoHtml.children));
        this.elementosItemListaArray = this.elementosArray.generarInstanciasItemLista();
    }

    ocultarTodos() {
        this.elementosArray.iterar('ocultar');
    }

    mostrarTodos() {
        this.elementosArray.iterar('mostrar');
    }
}


const constanciaFormulario = new Elemento(document.getElementById('constancia_formulario'));
const formularioContenedor = new Elemento(document.querySelector('.form__bloque-contenedor'));

const pacienteBloque = new Elemento(document.getElementById('paciente_bloque'));

const pacienteElegir = new ElementosArray(document.querySelector('.paciente_elegir'));

const pacienteBuscarInput = new Input(document.getElementById('paciente_buscar-input'));
const pacienteElegirNuevo = new Boton(document.getElementById('paciente_elegir-nuevo'));
const pacienteBuscarLista = new Lista(document.getElementById('paciente_buscar-lista'));
const pacienteBuscarItemLista = pacienteBuscarLista.elementosItemListaArray;
const personaNoPacienteBuscarLista = new Lista(document.getElementById('persona_no_paciente_buscar-lista'));
const personaNoPacienteBuscarItemLista = personaNoPacienteBuscarLista.elementosItemListaArray;

const pacienteModificarArray = new ElementosArray(Array.from(document.querySelectorAll('.paciente_modificar')));

const pacienteDniLabel = new Elemento(document.getElementById('paciente_dni-label'));
const pacienteDniError = new Elemento(document.getElementById('paciente_dni-error'));
const pacienteDni = new Input(document.getElementById('paciente_dni'));

const pacienteNombreLabel = new Elemento(document.getElementById('paciente_nombre-label'));
const pacienteNombreError = new Elemento(document.getElementById('paciente_nombre-error'));
const pacienteNombre = new Input(document.getElementById('paciente_nombre'));

const pacienteApellidoLabel = new Elemento(document.getElementById('paciente_apellido-label'));
const pacienteApellidoError = new Elemento(document.getElementById('paciente_apellido-error'));
const pacienteApellido = new Input(document.getElementById('paciente_apellido'));

const pacienteGeneroLabel = new Elemento(document.getElementById('paciente_genero-label'));
const pacienteGeneroError = new Elemento(document.getElementById('paciente_genero-error'));
const pacienteGeneroFemenino = new Boton(document.getElementById('paciente_genero-femenino'));
const pacienteGeneroMasculino = new Boton(document.getElementById('paciente_genero-masculino'));
const pacienteGenero = new Input(document.getElementById('paciente_genero'));

const pacienteInternacionLabel = new Elemento(document.getElementById('paciente_internacion-label'));
const pacienteInternacionError = new Elemento(document.getElementById('paciente_internacion-error'));
const pacienteInternacion = new Input(document.getElementById('paciente_internacion'));

const pacienteExternacionLabel = new Elemento(document.getElementById('paciente_externacion-label'));
const pacienteExternacionError = new Elemento(document.getElementById('paciente_externacion-error'));
const pacienteExternacion = new Input(document.getElementById('paciente_externacion'));
const pacienteEstaInternadoBoolean = new Elemento(document.getElementById('paciente_esta_internado-boolean'));
const pacienteEstaInternadoAlternar = new Boton(document.getElementById('paciente_esta_internado-alternar'));

const pacienteTipoEdadLabel = new Elemento(document.getElementById('paciente_tipo_edad-label'));
const pacienteTipoEdadError = new Elemento(document.getElementById('paciente_tipo_edad-error'));
const pacienteTipoEdadMenor = new Boton(document.getElementById('paciente_tipo_edad-menor'));
const pacienteTipoEdadAdulto = new Boton(document.getElementById('paciente_tipo_edad-adulto'));
const pacienteTipoEdad = new Input(document.getElementById('paciente_tipo_edad'));

const familiarBloque = new Elemento(document.getElementById('familiar_bloque'));

const familiarElegir = new Elemento(document.querySelector('.familiar_elegir'));

const familiarElegirRelacionado = new Boton(document.getElementById('familiar_elegir-relacionado'));
const familiarElegirAgregar = new Boton(document.getElementById('familiar_elegir-agregar'));
const familiarRelacionadoLista = new Lista(document.getElementById('familiar_relacionado-lista'));
const familiarRelacionadoItemLista = familiarRelacionadoLista.elementosItemListaArray;

const familiarAgregar = new Elemento(document.querySelector('.familiar_agregar'));
const familiarAgregarBuscarInput = new Input(document.getElementById('familiar_agregar_buscar-input'));
const familiarAgregarNuevo = new Boton(document.getElementById('familiar_agregar_nuevo'));
const familiarAgregarBuscarLista = new Lista(document.getElementById('familiar_agregar_buscar-lista'));
const familiarAgregarBuscarItemLista =familiarAgregarBuscarLista.elementosItemListaArray;

const familiarModificar = new Elemento(document.querySelector('.familiar_modificar'));

const familiarModificarArray = new ElementosArray(document.querySelectorAll('.familiar_modificar'));

const familiarDniLabel = new Elemento(document.getElementById('familiar_dni-label'));
const familiarDniError = new Elemento(document.getElementById('familiar_dni-error'));
const familiarDni = new Input(document.getElementById('familiar_dni'));

const familiarNombreLabel = new Elemento(document.getElementById('familiar_nombre-label'));
const familiarNombreError = new Elemento(document.getElementById('familiar_nombre-error'));
const familiarNombre = new Input(document.getElementById('familiar_nombre'));

const familiarApellidoLabel = new Elemento(document.getElementById('familiar_apellido-label'));
const familiarApellidoError = new Elemento(document.getElementById('familiar_apellido-error'));
const familiarApellido = new Input(document.getElementById('familiar_apellido'));

const familiarGeneroLabel = new Elemento(document.getElementById('familiar_genero-label'));
const familiarGeneroError = new Elemento(document.getElementById('familiar_genero-error'));
const familiarGeneroFemenino = new Boton(document.getElementById('familiar_genero-femenino'));
const familiarGeneroMasculino = new Boton(document.getElementById('familiar_genero-masculino'));
const familiarGenero = new Input(document.getElementById('familiar_genero'));

const relacionLabel = new Elemento(document.getElementById('relacion_paciente_familiar-label'));
const relacionError = new Elemento(document.getElementById('relacion_paciente_familiar-error'));
const relacion = new Input(document.getElementById('relacion_paciente_familiar'));

const presentacionBloque = new Elemento(document.getElementById('presentacion_bloque'));

const presentacionLabel = new Elemento(document.getElementById('presentacion-label'));
const presentacionError = new Elemento(document.getElementById('presentacion-error'));
const presentacion = new Input(document.getElementById('presentacion'));

const navegadorContenedor = new Elemento(document.querySelector('.main__nav-contenedor'));
const volver = new Boton(document.getElementById('volver'));
const confirmar = new Boton(document.getElementById('confirmar'));
const imprimir = new Boton(document.getElementById('imprimir'));

const esFemenino = 'femenino';
const esMasculino = 'masculino';
const esMenor = 'menor';
const esAdulto = 'adulto';
let estaInternado = false;


function filtrarListaPersonas(personaItemLista, listaCadenasBuscadas){
    // Itera sobre los elementos de la lista
    personaItemLista.forEach(elemento => {
        // Obtiene los atributos relevantes para la búsqueda
        let dni = elemento.obtenerValorAtributo('data-dni').toLowerCase();
        let nombre = elemento.obtenerValorAtributo('data-nombre').toLowerCase();
        let apellido = elemento.obtenerValorAtributo('data-apellido').toLowerCase();

        // Verifica si todas las cadenas buscadas coinciden con algún atributo
        let todasLasPalabrasCoinciden = listaCadenasBuscadas.every(cadena => {
            return dni.includes(cadena) || nombre.includes(cadena) || apellido.includes(cadena);
        });

        // Muestra u oculta el elemento según si todas las cadenas coinciden
        if (todasLasPalabrasCoinciden) {
            elemento.mostrar();
        } else {
            elemento.ocultar();
        }
    });
}

function desplegarCampos(camposDesplegarArray){
    camposDesplegarArray.iterar('mostrar');
}

function seleccionarBotonGenero(personaGenero, botonFemenino, botonMasculino) {
    if (personaGenero.obtenerValor() === esFemenino) {
        botonFemenino.html.click();
    } else {
        botonMasculino.html.click();
    }
}

function seleccionarBotonTipoEdad(personaTipoEdad, botonMenor, botonAdulto) {
    if (personaTipoEdad.obtenerValor() === esMenor) {
        botonMenor.html.click();
    } else {
        botonAdulto.html.click();
    }
}

function seleccionarBotonExternacion(pacienteExternacion, botonEstaInternadoAlternar) {
    if (pacienteExternacion.obtenerValor() === '') {
        estaInternado = false;
    } else {
        estaInternado = true;
    }
    botonEstaInternadoAlternar.html.click();
}

function resetearOpcionesPaciente() {
    pacienteGeneroFemenino.resetear();
    pacienteGeneroMasculino.resetear();
    pacienteExternacion.html.disabled = false;
    pacienteEstaInternadoAlternar.removerClases('seleccionado', 'descartado');
    pacienteTipoEdadMenor.resetear();
    pacienteTipoEdadAdulto.resetear();
}

function resetearOpcionesFamiliar() {
    familiarGeneroFemenino.resetear();
    familiarGeneroMasculino.resetear();
}

function resetearTodos() {
    resetearOpcionesPaciente();
    resetearOpcionesFamiliar();
}

function desplegarBloqueFamiliar(){
    familiarElegirRelacionado.html.click()
    familiarBloque.mostrar();
    familiarRelacionadoLista.mostrar();
}

function desplegarFamiliaresRelacionados(){
    familiarAgregar.ocultar()
    familiarRelacionadoLista.mostrar();
    let dniPacienteBuscado = pacienteDni.obtenerValor();

    familiarRelacionadoItemLista.forEach(familiar => {
        let dniPacienteRelacion = familiar.obtenerValorAtributo('data-dni-paciente-relacionado');
        if (dniPacienteRelacion.includes(dniPacienteBuscado)) {
            familiar.mostrar();
        } else {
            familiar.ocultar();
        }
    });
}

function desplegarFamiliaresAgregar(){
    familiarRelacionadoLista.ocultar();
    familiarAgregar.mostrar()
}

function desplegarFamiliaresAgregar(){
    familiarRelacionadoLista.ocultar();
    familiarAgregar.mostrar()
}

function desplegarBloquePresentacion(){
    presentacionBloque.mostrar();
}


// LOGICA PARA OPCIONES

pacienteGeneroFemenino.html.addEventListener('click', function() {
    pacienteGenero.actualizarValor(esFemenino);
    pacienteGeneroFemenino.seleccionar(pacienteGeneroMasculino);
});

pacienteGeneroMasculino.html.addEventListener('click', function() {
    pacienteGenero.actualizarValor(esMasculino);
    pacienteGeneroMasculino.seleccionar(pacienteGeneroFemenino);
});

pacienteEstaInternadoAlternar.html.addEventListener('click', function() {
    estaInternado = !estaInternado;
    if (estaInternado) {
        pacienteEstaInternadoAlternar.seleccionar();
        pacienteExternacion.actualizarValor(null);
        pacienteExternacion.html.disabled = true;
    } else {
        pacienteEstaInternadoAlternar.descartar();
        pacienteExternacion.html.disabled = false;
    }
});

pacienteTipoEdadMenor.html.addEventListener('click', function() {
    pacienteTipoEdadMenor.seleccionar(pacienteTipoEdadAdulto);
    pacienteTipoEdad.actualizarValor(esMenor);
})

pacienteTipoEdadAdulto.html.addEventListener('click', function() {
    pacienteTipoEdadAdulto.seleccionar(pacienteTipoEdadMenor);
    pacienteTipoEdad.actualizarValor(esAdulto);
})

familiarGeneroFemenino.html.addEventListener('click', function() {
    familiarGenero.actualizarValor(esFemenino);
    familiarGeneroFemenino.seleccionar(familiarGeneroMasculino);
});

familiarGeneroMasculino.html.addEventListener('click', function() {
    familiarGenero.actualizarValor(esMasculino);
    familiarGeneroMasculino.seleccionar(familiarGeneroFemenino);
});





// 1.- ELEGIR PACIENTE

//  a.1- BUSCAR
pacienteBuscarInput.html.addEventListener('input', function() {

    let cadenaBuscada = pacienteBuscarInput.obtenerValor().toLowerCase();
    let listaCadenasBuscadas = cadenaBuscada.split(' ');
    
    if (cadenaBuscada.length < 3) {
        pacienteBuscarLista.ocultarTodos();
        personaNoPacienteBuscarLista.ocultarTodos();
    } else {
        filtrarListaPersonas(pacienteBuscarItemLista, listaCadenasBuscadas);
        filtrarListaPersonas(personaNoPacienteBuscarItemLista, listaCadenasBuscadas);
    }
});

//  a.2.- OBTENER VALORES
pacienteBuscarItemLista.forEach(elemento => {
    // Agrega un evento de escucha al elemento
    elemento.html.addEventListener('click', function() {
        // Pasando los valores a los campos
        pacienteDni.actualizarValor(elemento.obtenerValorAtributo('data-dni'));
        pacienteNombre.actualizarValor(elemento.obtenerValorAtributo('data-nombre'));        
        pacienteApellido.actualizarValor(elemento.obtenerValorAtributo('data-apellido'));
        pacienteGenero.actualizarValor(elemento.obtenerValorAtributo('data-genero'));
        seleccionarBotonGenero(pacienteGenero, pacienteGeneroFemenino, pacienteGeneroMasculino);
        pacienteInternacion.actualizarValor(elemento.obtenerValorAtributo('data-internacion'));
        pacienteExternacion.actualizarValor(elemento.obtenerValorAtributo('data-externacion'));
        seleccionarBotonExternacion(pacienteExternacion, pacienteEstaInternadoAlternar);
        pacienteTipoEdad.actualizarValor(elemento.obtenerValorAtributo('data-tipo-edad'));
        seleccionarBotonTipoEdad(pacienteTipoEdad, pacienteTipoEdadMenor, pacienteTipoEdadAdulto);

        // Mostrar campos para poder modificar al paciente
        desplegarCampos(pacienteModificarArray)

        // Abrir bloque familiar para continuar
        desplegarBloqueFamiliar();
    });
});

personaNoPacienteBuscarItemLista.forEach(elemento => {
    // Agrega un evento de escucha al elemento
    elemento.html.addEventListener('click', function() {
        // Pasando los valores a los campos
        pacienteDni.actualizarValor(elemento.obtenerValorAtributo('data-dni'));
        pacienteNombre.actualizarValor(elemento.obtenerValorAtributo('data-nombre'));        
        pacienteApellido.actualizarValor(elemento.obtenerValorAtributo('data-apellido'));
        pacienteGenero.actualizarValor(elemento.obtenerValorAtributo('data-genero'));
        seleccionarBotonGenero(pacienteGenero, pacienteGeneroFemenino, pacienteGeneroMasculino);
        pacienteTipoEdad.actualizarValor(elemento.obtenerValorAtributo('data-tipo-edad'));
        seleccionarBotonTipoEdad(pacienteTipoEdad, pacienteTipoEdadMenor, pacienteTipoEdadAdulto);

        // Mostrar campos para poder modificar al paciente
        desplegarCampos(pacienteModificarArray)

        // Abrir bloque familiar para continuar
        desplegarBloqueFamiliar();
    });
});

//  b.- NUEVO
pacienteElegirNuevo.html.addEventListener('click', function() {
    pacienteDni.actualizarValor('');
    pacienteNombre.actualizarValor('');
    pacienteApellido.actualizarValor('');
    pacienteGenero.actualizarValor('');
    pacienteInternacion.actualizarValor('');
    pacienteExternacion.actualizarValor('');
    pacienteTipoEdad.actualizarValor('');
    resetearOpcionesPaciente();

    desplegarCampos(pacienteModificarArray);
    familiarBloque.ocultar();
    presentacionBloque.ocultar();
});

// Abrir bloque familiar una vez dado un DNI de paciente
pacienteDni.html.addEventListener('input', function() {
    if (this.value.length > 6) {
        desplegarBloqueFamiliar();
    }
})


// ELEGIR FAMILIAR

//  a.- RELACIONADOS
familiarElegirRelacionado.html.addEventListener('click', function() {
    familiarElegirRelacionado.seleccionar(familiarElegirAgregar);
    desplegarFamiliaresRelacionados();
});

familiarRelacionadoItemLista.forEach(persona => {
    // Agrega un evento de escucha a la persona
    persona.html.addEventListener('click', function() {
        // Pasando los valores a los campos
        familiarDni.actualizarValor(persona.obtenerValorAtributo('data-dni'));
        familiarNombre.actualizarValor(persona.obtenerValorAtributo('data-nombre'));        
        familiarApellido.actualizarValor(persona.obtenerValorAtributo('data-apellido'));
        familiarGenero.actualizarValor(persona.obtenerValorAtributo('data-genero'));
        seleccionarBotonGenero(familiarGenero, familiarGeneroFemenino, familiarGeneroMasculino);
        relacion.actualizarValor(persona.obtenerValorAtributo('data-vinculo'));

        // Mostrar campos para poder modificar al familiar
        desplegarCampos(familiarModificarArray);
        desplegarBloquePresentacion();
    });
});

//  b.1.I.- AGREGAR DE EXISTENTES
familiarElegirAgregar.html.addEventListener('click', function() {
    familiarElegirAgregar.seleccionar(familiarElegirRelacionado);
    desplegarFamiliaresAgregar();
});

familiarAgregarBuscarInput.html.addEventListener('input', function() {
    let cadenaBuscada = familiarAgregarBuscarInput.obtenerValor().toLowerCase();
    let listaCadenasBuscadas = cadenaBuscada.split(' ');
    
    if (cadenaBuscada.length < 3) {
        familiarAgregarBuscarLista.ocultarTodos();
    } else {
        filtrarListaPersonas(familiarAgregarBuscarItemLista, listaCadenasBuscadas);
    }
});

//  b.1.II.- OBTENER VALORES
familiarAgregarBuscarItemLista.forEach(persona => {
    // Agrega un evento de escucha a la persona
    persona.html.addEventListener('click', function() {
        // Pasando los valores a los campos
        familiarDni.actualizarValor(persona.obtenerValorAtributo('data-dni'));
        familiarNombre.actualizarValor(persona.obtenerValorAtributo('data-nombre'));        
        familiarApellido.actualizarValor(persona.obtenerValorAtributo('data-apellido'));
        familiarGenero.actualizarValor(persona.obtenerValorAtributo('data-genero'));
        seleccionarBotonGenero(familiarGenero, familiarGeneroFemenino, familiarGeneroMasculino);

        // Mostrar campos para poder modificar al familiar
        desplegarCampos(familiarModificarArray);
        desplegarBloquePresentacion();
    });
});


//  b.2.- AGREGAR NUEVO
familiarAgregarNuevo.html.addEventListener('click', function() {
    familiarDni.actualizarValor('');
    familiarNombre.actualizarValor('');
    familiarApellido.actualizarValor('');
    relacion.actualizarValor('');
    resetearOpcionesFamiliar();

    desplegarCampos(familiarModificarArray);
});


// ELEGIR PRESENTACION
// Abrir bloque presentacion una vez dado un DNI de familiar
familiarDni.html.addEventListener('input', function() {
    if (this.value.length > 6) {
        desplegarBloquePresentacion();
    }
})


// NAVEGACIÓN - VOLVER
volver.html.addEventListener('click', (e) => {window.location.href = indexUrl;});


// NAVEGACION - CONFIRMAR
confirmar.html.addEventListener('click', (e) => {
    e.preventDefault();
    if (validarForm()) {
        constanciaFormulario.html.submit();
    }
});








// LOGICA PARA VALIDACIÓN FRONT DEL FORMULARIO
const exregDni = /^[1-9]\d{6,7}$/;
const exregPalabras = /^[a-zA-ZñÑ]+(?:\s[a-zA-ZñÑ]+)*$/;
const exregFecha = /^(19[6-9]\d|20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;


function validarConExreg(objeto, exreg, errorHtml) {
    let errorDetectado = '';
    let esValido = false;
    let cadena = objeto.obtenerValor()

    if (cadena === '') {
        errorDetectado = ' ¡Incompleto!';
    } else if (!exreg.test(cadena)) {
        errorDetectado = ' ¡Inválido!';
    } else {
        esValido = true;
    }

    errorHtml.html.innerHTML = errorDetectado;
    return esValido;
}


function validarEleccion(botonOpcion1, botonOpcion2, errorHtml) {
    let errorDetectado = '';
    let esValido = false;
    if (!(botonOpcion1.html.classList.contains('seleccionado') || botonOpcion2.html.classList.contains('seleccionado'))) {
        errorDetectado = ' ¡Sin selección!';
    } else {
        esValido = true;
    }
    errorHtml.html.innerHTML = errorDetectado;
    return esValido;
}


function validarUsoAlternar(botonAlternar) {
    botonAlternar.html.classList.contains('')
}


function validarInternacion(errorHtml) {
    let errorDetectado = '';
    let esValido = estaInternado;

    fechaIngresada = new Date(pacienteInternacion.obtenerValor())

    if (fechaIngresada > fechaActual) {
        errorDetectado = ' ¡No puede ser posterior a hoy!';
    } else {
        return validarConExreg(pacienteInternacion, exregFecha, errorHtml)
    }
    errorHtml.html.innerHTML = errorDetectado;
    return esValido;
}

function validarExternacion(errorHtml) {
    let errorDetectado = '';
    let esValido = estaInternado;
    let fechaInternacion = new Date(pacienteInternacion.obtenerValor());
    let fechaExternacion = new Date(pacienteExternacion.obtenerValor());

    
    if (!estaInternado) {
        if (
            pacienteExternacion.obtenerValor() == '' &&
            !pacienteEstaInternadoAlternar.html.classList.contains('descartado')
        ) {
            errorDetectado = ' ¡Sin selección!';
        } else if (fechaInternacion > fechaExternacion) {
            errorDetectado = ' ¡No puede ser anterior a la internación!';
        } else {
            return validarConExreg(pacienteExternacion, exregFecha, errorHtml)
        }
    }
    errorHtml.html.innerHTML = errorDetectado;
    return esValido;
}



function validarForm() {
    let esValidoPacienteDni = validarConExreg(pacienteDni, exregDni, pacienteDniError);
    let esValidoPacienteNombre = validarConExreg(pacienteNombre, exregPalabras, pacienteNombreError);
    let esValidoPacienteApellido = validarConExreg(pacienteApellido, exregPalabras, pacienteApellidoError);
    let esValidoPacienteGenero = validarEleccion(pacienteGeneroFemenino, pacienteGeneroMasculino, pacienteGeneroError);
    let esValidoPacienteInternacion = validarInternacion(pacienteInternacionError);
    let esValidoPacienteExternacion = validarExternacion(pacienteExternacionError);
    let esValidoPacienteTipoEdad = validarEleccion(pacienteTipoEdadAdulto, pacienteTipoEdadMenor, pacienteTipoEdadError);
    let esValidoFamiliarDni = validarConExreg(familiarDni, exregDni, familiarDniError);
    let esValidoFamiliarNombre = validarConExreg(familiarNombre, exregPalabras, familiarNombreError);
    let esValidoFamiliarApellido = validarConExreg(familiarApellido, exregPalabras, familiarApellidoError);
    let esValidoFamiliarGenero = validarEleccion(familiarGeneroFemenino, familiarGeneroMasculino, familiarGeneroError);
    let esValidoRelacion = validarConExreg(relacion, exregPalabras, relacionError);
    let esValidoPresentacion = validarConExreg(presentacion, exregFecha, presentacionError);
    if (
        esValidoPacienteNombre && esValidoPacienteApellido && esValidoPacienteDni && esValidoPacienteGenero &&
        esValidoPacienteInternacion && esValidoPacienteExternacion && esValidoPacienteTipoEdad &&
        esValidoFamiliarNombre && esValidoFamiliarApellido && esValidoFamiliarDni &&  esValidoFamiliarGenero &&
        esValidoRelacion && esValidoPresentacion
    ) {
        return true;
    }
};

