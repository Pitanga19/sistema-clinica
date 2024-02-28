class Elemento {
    constructor(elementoHtml){
        this.html = elementoHtml;
    }

    agregarClase(clase) {
        this.html.classList.add(clase);
    }
    
    removerClase(clase) {
        this.html.classList.remove(clase);
    }
    
    ocultar(){
        this.agregarClase('invisible');
    }

    mostrar(){
        this.removerClase('invisible');
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
const pacienteBooleanEstaInternado = new Elemento(document.getElementById('paciente_booleano_esta_internado'));
const pacienteAlternarEstaInternado = new Boton(document.getElementById('paciente_alternar_esta_internado'));

const pacienteTipoEdadLabel = new Elemento(document.getElementById('paciente_tipo_edad-label'));
const pacienteTipoEdadError = new Elemento(document.getElementById('paciente_tipo_edad-error'));
const pacienteTipoEdadMenor= new Elemento(document.getElementById('paciente_tipo_edad-menor'));
const pacienteTipoEdadAdulto = new Elemento(document.getElementById('paciente_tipo_edad-adulto'));
const pacienteTipoEdad = new Input(document.getElementById('paciente_tipo_edad'));

const familiarBloque = new Elemento(document.getElementById('familiar_bloque'));

const familiarElegir = new Elemento(document.querySelector('.familiar_elegir'));

const familiarElegirRelacionado = new Boton(document.getElementById('familiar_elegir-relacionado'));
const familiarElegirAgregar = new Boton(document.getElementById('familiar_elegir-agregar'));
const familiarRelacionadoLista = new Lista(document.getElementById('familiar_relacionado-lista'));
const familiarRelacionadoItemLista = familiarRelacionadoLista.elementosItemListaArray;

const familiarModificar = new Elemento(document.querySelector('.familiar_modificar'));

const familiarBuscarInput = new Input(document.getElementById('familiar_buscar-input'));
const familiarElegirNuevo = new Boton(document.getElementById('familiar_elegir-nuevo'));
const familiarBuscarLista = new Lista(document.getElementById('familiar_buscar-lista'));
const familiarBuscarItemLista = Array.from(familiarBuscarLista.html.getElementsByTagName('li'));

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


// 1.- ELEGIR PACIENTE

//  a.1- BUSCAR
pacienteBuscarInput.html.addEventListener('input', function() {

    let cadenaBuscada = pacienteBuscarInput.obtenerValor().toLowerCase();
    let listaCadenasBuscadas = cadenaBuscada.split(' ');
    
    if (cadenaBuscada.length < 3) {
        pacienteBuscarLista.ocultarTodos();
    } else {
        // Itera sobre los elementos de la lista
        pacienteBuscarItemLista.forEach(elemento => {
            // Obtiene los atributos relevantes para la búsqueda
            let nombre = elemento.obtenerValorAtributo('data-nombre').toLowerCase();
            let apellido = elemento.obtenerValorAtributo('data-apellido').toLowerCase();
            let dni = elemento.obtenerValorAtributo('data-dni').toLowerCase();

            // Verifica si todas las palabras buscadas coinciden con algún atributo
            let todasLasPalabrasCoinciden = listaCadenasBuscadas.every(palabra => {
                return nombre.includes(palabra) || apellido.includes(palabra) || dni.includes(palabra);
            });

            // Muestra u oculta el elemento según si todas las palabras coinciden
            if (todasLasPalabrasCoinciden) {
                elemento.mostrar();
            } else {
                elemento.ocultar();
            }
        });
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
        pacienteInternacion.actualizarValor(elemento.obtenerValorAtributo('data-internacion'));
        pacienteExternacion.actualizarValor(elemento.obtenerValorAtributo('data-externacion'));
        pacienteTipoEdad.actualizarValor(elemento.obtenerValorAtributo('data-tipo-edad'));

        // abrir campos para poder modificar al paciente
        pacienteModificarArray.iterar('mostrar');

        // abrir bloque familiar para continuar
        familiarBloque.mostrar();
    });
});

//  b.- NUEVO
pacienteElegirNuevo.html.addEventListener('click', function() {
    pacienteBuscarItemLista.forEach(elemento => {
        pacienteDni.actualizarValor('');
        pacienteNombre.actualizarValor('');
        pacienteApellido.actualizarValor('');
        pacienteGenero.actualizarValor('');
        pacienteInternacion.actualizarValor('');
        pacienteExternacion.actualizarValor(elemento.obtenerValorAtributo('data-externacion'));
        pacienteTipoEdad.actualizarValor('');
        pacienteModificarArray.iterar('mostrar');
        familiarBloque.ocultar();
    });
});

// abrir bloque familiar una vez dado un DNI de paciente
pacienteDni.html.addEventListener('input', function() {
    if (this.value.length > 6) {
        familiarBloque.mostrar();
    }
})


// ELEGIR FAMILIAR

// Redireccionar al hacer clic en el botón "Volver"
volver.html.addEventListener('click', (e) => {window.location.href = "{% url 'index' %}";});

function validarPalabra(palabra, errorHtml) {
    let error;
    let esValido = false;
    if (palabra === '') {
        error = ' ¡Incompleto!'
    } else if (/[^a-zA-ZñÑ\s]/.test(palabra)) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        esValido = true
    };
    errorHtml.innerHTML = error;
    return esValido;
};

function validarDni(dni, errorHtml) {
    let error;
    let esValido = false;
    if (dni === '') {
        error = ' ¡Incompleto!'
    } else if (/^(?:\D*(\d{1,6}|\d{9,})\D*|\s*)$|\D/.test(dni)) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        esValido = true
    };
    errorHtml.innerHTML = error;
    return esValido;
}

function validarGenero(genero, errorHtml) {
    let error;
    let esValido = false;
    if (genero === esFemenino || genero === esMasculino) {
        error = '';
        esValido = true
    } else {
        error = ' ¡Sin selección!'
    }
    errorHtml.innerHTML = error;
    return esValido;
}

function validarFecha(fecha, errorHtml) {
    let error;
    let esValido = false;
    year = parseInt(fecha.split('-')[0]);
    if (fecha === '') {
        error = ' ¡Incompleto!'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || year < 1959) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        esValido = true
    };
    errorHtml.innerHTML = error;
    return esValido;
}

function esValidoarForm(pacienteNombre, pacienteApellido, pacienteDni, pacienteGenero, pacienteInternacion, pacienteExternacion, pacienteEdad, familiarNombre, familiarApellido, familiarDni, familiarGenero, relacion, presentacion) {
    let esValidoPacienteNombre = validarPalabra(pacienteNombre.obtenerValor(), pacienteNombreError.html);
    let esValidoPacienteApellido = validarPalabra(pacienteApellido.obtenerValor(), pacienteApellidoError.html);
    let esValidoPacienteDni = validarDni(pacienteDni.obtenerValor(), pacienteDniError.html);
    let esValidoPacienteGenero = validarGenero(pacienteGenero.obtenerValor(), pacienteGeneroError.html);
    let esValidoPacienteInternacion = validarFecha(pacienteInternacion.obtenerValor(), pacienteInternacionError.html);
    //let esValidoPacienteExternacion = esValidoarExit(pacienteExternacion);
    //let esValidoPacienteEdad = esValidoarAge(pacienteEdad, errorPacienteEdad);
    let esValidoFamiliarNombre = validarPalabra(familiarNombre.obtenerValor(), familiarNombreError.html);
    let esValidoFamiliarApellido = validarPalabra(familiarApellido.obtenerValor(), familiarApellidoError.html);
    let esValidoFamiliarDni = validarDni(familiarDni.obtenerValor(), familiarDniError.html);
    let esValidoFamiliarGenero = validarGenero(familiarGenero.obtenerValor(), familiarGeneroError.html);
    let esValidoRelacion = validarPalabra(relacion.obtenerValor(), relacionError.html);
    let esValidoPresentacion = validarFecha(presentacion.obtenerValor(), presentacionError.html);
    if (
        esValidoPacienteNombre && esValidoPacienteApellido && esValidoPacienteDni && esValidoPacienteGenero &&
        esValidoPacienteInternacion && /*esValidoPacienteExternacion && esValidoPacienteEdad && */
        esValidoFamiliarNombre && esValidoFamiliarApellido && esValidoFamiliarDni &&  esValidoFamiliarGenero &&
        esValidoRelacion && esValidoPresentacion
    ) {
        return true;
    }
};


confirmar.html.addEventListener('click', (e) => {
    e.preventDefault();
    let pacienteNombre = inputPacienteNombre.value;
    let pacienteApellido = inputPacienteApellido.value;
    let pacienteDni = pacienteDni.value;
    let pacienteGenero = inputFamiliarGenero.value;
    let pacienteInternacion = pacienteInternacion.value;
    let pacienteExternacion = checkAdmitted();
    let pacienteEdad = pacienteTipoEdad.value;
    let familiarNombre = inputFamiliarNombre.value;
    let familiarApellido = inputFamiliarApellido.value;
    let familiarDni = inputFamiliarDni.value;
    let familiarGenero = inputFamiliarGenero.value;
    let relacion = inputRelacion.value;
    let presentacion = inputPresentacion.value;
    if (esValidoarForm(pacienteNombre, pacienteApellido, pacienteDni, pacienteGenero, pacienteInternacion, pacienteExternacion, pacienteEdad, familiarNombre, familiarApellido, familiarDni, familiarGenero, relacion, presentacion)) {
        constanciaFormulario.submit();
    }
});