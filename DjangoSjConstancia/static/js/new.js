const constanciaFormulario = document.getElementById('constancia_formulario');
const formularioContenedor = document.querySelector('.form__bloque-contenedor');

const pacienteBloque = document.getElementById('paciente_bloque');

const pacienteElegir = document.querySelector('.paciente_elegir');

const pacienteBuscarInput = document.getElementById('paciente_buscar-input');
const pacienteElegirNuevo = document.getElementById('paciente_elegir-nuevo')
const pacienteBuscarLista = document.getElementById('paciente_buscar-lista')
const patienteBuscarArray = Array.from(pacienteBuscarLista.getElementsByTagName('li'));

const pacienteModificarArray = document.querySelectorAll('.paciente_modificar');

const pacienteNombreLabel = document.getElementById('paciente_nombre-label')
const pacienteNombreError = document.getElementById('paciente_nombre-error')
const pacienteNombre = document.getElementById('paciente_nombre');

const pacienteApellidoLabel = document.getElementById('paciente_apellido-label')
const pacienteApellidoError = document.getElementById('paciente_apellido-error')
const pacienteApellido = document.getElementById('paciente_apellido');

const pacienteDniLabel = document.getElementById('paciente_dni-label')
const pacienteDniError = document.getElementById('paciente_dni-error')
const pacienteDni = document.getElementById('paciente_dni');

const pacienteGeneroLabel = document.getElementById('paciente_genero-label')
const pacienteGeneroError = document.getElementById('paciente_genero-error')
const pacienteGeneroFemenino = document.getElementById('paciente_genero-femenino');
const pacienteGeneroMasculino = document.getElementById('paciente_genero-masculino');
const pacienteGenero = document.getElementById('paciente_genero');

const pacienteInternacionLabel = document.getElementById('paciente_internacion-label')
const pacienteInternacionError = document.getElementById('paciente_internacion-error')
const pacienteInternacion = document.getElementById('paciente_internacion');

const pacienteExternacionLabel = document.getElementById('paciente_externacion-label')
const pacienteExternacionError = document.getElementById('paciente_externacion-error')
const pacienteExternacion = document.getElementById('paciente_externacion');
const pacienteBooleanEstaInternado = document.getElementById('paciente_booleano_esta_internado');
const pacienteAlternarEstaInternado = document.getElementById('paciente_alternar_esta_internado');

const pacienteTipoEdadLabel = document.getElementById('paciente_tipo_edad-label')
const pacienteTipoEdadError = document.getElementById('paciente_tipo_edad-error')
const pacienteTipoEdadMenor= document.getElementById('paciente_tipo_edad-menor');
const pacienteTipoEdadAdulto = document.getElementById('paciente_tipo_edad-adulto');
const pacienteTipoEdad = document.getElementById('paciente_tipo_edad');

const familiarBloque = document.getElementById('familiar_bloque');

const familiarElegir = document.querySelector('.familiar_elegir');

const familiarElegirRelacionado = document.getElementById('familiar_elegir-relacionado')
const familiarElegirAgregar = document.getElementById('familiar_elegir-agregar')
const familiarRelacionadoLista = document.getElementById('familiar_relacionado-lista')
const familiarRelacionadoArray = Array.from(pacienteBuscarLista.getElementsByTagName('li'));

const familiarModificar = document.querySelector('.familiar_modificar');

const familiarBuscarInput = document.getElementById('familiar_buscar-input');
const familiarElegirNuevo = document.getElementById('familiar_elegir-nuevo')
const familiarBuscarLista = document.getElementById('familiar_buscar-lista')
const familiarBuscarArray = Array.from(pacienteBuscarLista.getElementsByTagName('li'));

const familiarModificarArray = document.querySelectorAll('.familiar_modificar');

const familiarNombreLabel = document.getElementById('familiar_nombre-label')
const familiarNombreError = document.getElementById('familiar_nombre-error')
const familiarNombre = document.getElementById('familiar_nombre');

const familiarApellidoLabel = document.getElementById('familiar_apellido-label')
const familiarApellidoError = document.getElementById('familiar_apellido-error')
const familiarApellido = document.getElementById('familiar_apellido');

const familiarDniLabel = document.getElementById('familiar_dni-label')
const familiarDniError = document.getElementById('familiar_dni-error')
const familiarDni = document.getElementById('familiar_dni');

const familiarGeneroLabel = document.getElementById('familiar_genero-label')
const familiarGeneroError = document.getElementById('familiar_genero-error')
const familiarGeneroFemenino = document.getElementById('familiar_genero-femenino');
const familiarGeneroMasculino = document.getElementById('familiar_genero-masculino');
const familiarGenero = document.getElementById('familiar_genero');

const presentacionBloque = document.getElementById('presentacion_bloque');

const presentacionLabel = document.getElementById('presentacion-label')
const presentacionError = document.getElementById('presentacion-error')
const presentacion = document.getElementById('presentacion');

const navegadorContenedor = document.querySelector('.main__nav-contenedor');
const volver = document.getElementById('volver');
const confirmar = document.getElementById('confirmar');
const imprimir = document.getElementById('imprimir');


let pIsAdmitted = false;

const isFemale = 'femenino';
const isMale = 'masculino';
const isMinor = 'menor';
const isAdult = 'adulto';

class Elemento {
    constructor(elementoHtml){
        this.elementoHtml = elementoHtml
    }

    agregarClase(clase) {
        this.elementoHtml.classList.add(clase);
    }
    
    removerClase(clase) {
        this.elementoHtml.classList.remove(clase);
    }
    
    ocultar(){
        this.agregarClase('invisible')
    }

    mostrar(){
        this.removerClase('invisible')
    }

    establecerValorAtributo(atributo, valor) {
        this.elementoHtml.setAttribute(atributo, valor);
    }

    obtenerValorAtributo(atributo) {
        return this.elementoHtml.getAttribute(atributo);
    }

    removerAtributo(atributo) {
        this.elementoHtml.removeAttribute(atributo);
    }
}

class Input extends Elemento {
    constructor(elementoHtml){
        super(elementoHtml)
        this.valor = this.obtenerValor()
    }

    obtenerValor(){
        return this.elementoHtml.value
    }

    actualizarValor(nuevoValor) {
        this.elementoHtml.value = nuevoValor;
    }
}

class Button extends Elemento {
    constructor(elementoHtml){
        super(elementoHtml)
    }

    ejecutarMetodoOtraInstancia(instanciaOtraClase, metodo) {
        instanciaOtraClase[metodo]();
    }

    redireccionar(url) {
        window.location.href = url;
    }

    nuevaPestania(url) {
        window.open(url, '_blank');
    }
}

class Lista extends Elemento {
    constructor(elementoHtml) {
        super(elementoHtml);
        this.elementos = Array.from(elementoHtml.children);
    }

    ocultarTodos() {
        this.elementos.forEach(elemento => {
            elemento.ocultar();
        });
    }

    mostrarTodos() {
        this.elementos.forEach(elemento => {
            elemento.mostrar();
        });
    }

    filtrarPorTexto(texto) {
        return this.elementos.filter(elemento => {
            const nombre = elemento.getAttribute('data-nombre').toLowerCase();
            const apellido = elemento.getAttribute('data-apellido').toLowerCase();
            const dni = elemento.getAttribute('data-dni').toLowerCase();
            return nombre.includes(texto) || apellido.includes(texto) || dni.includes(texto);
        });
    }
}

// Espera a que el contenido del documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Ocultar todos los pacientes al cargar la página
    patientList.forEach(patient => {
        patient.style.display = 'none';
    });

    // Ocultar todos los familiares al cargar la página
    familiarList.forEach(familiar => {
        familiar.style.display = 'none';
    });

    // Agregar un evento de escucha al campo de búsqueda de pacientes
    pacienteBuscarInput.addEventListener('input', function() {
        // Obtener el texto de búsqueda y convertirlo a minúsculas
        const searchText = pacienteBuscarInput.value.toLowerCase();

        // Verificar si la longitud del texto de búsqueda es menor a 3 caracteres
        if (searchText.length < 3) {
            // Ocultar todos los pacientes si el texto es corto
            patientList.forEach(patient => {
                patient.style.display = 'none';
            });
        } else {
            // Mostrar pacientes que coincidan con la búsqueda
            let searchList = searchText.split(' ')
            patientList.forEach(patient => {
                const patientNombre = patient.getAttribute('data-nombre').toLowerCase();
                const patientApellido = patient.getAttribute('data-apellido').toLowerCase();
                const patientDNI = patient.getAttribute('data-dni').toLowerCase();

                let showPatient = true;

                // Verificar si el paciente NO coincide con al menos uno de los términos de búsqueda
                for (let search of searchList) {
                    if (!(patientNombre.includes(search) || patientApellido.includes(search) || patientDNI.includes(search))) {
                        showPatient = false;
                        break;
                    }
                }
                    
                // Mostrar u ocultar al paciente según el resultado de la búsqueda
                if (showPatient) {
                    patient.style.display = 'block';
                } else {
                    patient.style.display = 'none';
                }
            });
        }
    });
    
    // Agregar un evento de escucha al hacer clic en un paciente
    patientList.forEach(patient => {
        patient.addEventListener('click', function() {
            // Obtener los datos del paciente seleccionado
            const dni = patient.getAttribute('data-dni');
            const nombre = patient.getAttribute('data-nombre');
            const apellido = patient.getAttribute('data-apellido');
            const genero = patient.getAttribute('data-genero');
            const internacion = patient.getAttribute('data-internacion');
            const externacion = patient.getAttribute('data-externacion');
            const edad = patient.getAttribute('data-edad');
            
            // Actualizar los campos de entrada con los datos del paciente seleccionado
            inputPName.value = nombre;
            inputPLast.value = apellido;
            pacienteDni.value = dni;
            
            // Seleccionar el género del paciente
            if (genero == isFemale) {
                buttonPFemale.click()
            } else if (genero == isMale) {
                buttonPMale.click()
            };
            
            // Actualizar la fecha de internación del paciente
            pacienteInternacion.value = internacion;
            
            // Controlar la fecha de salida del paciente
            if (externacion === null || externacion === "null") {
                pacienteAlternarEstaInternado.classList.add('selected');
                pacienteExternacion.disabled = true;
                pacienteExternacion.value = '';
            } else {
                pacienteAlternarEstaInternado.classList.remove('selected');
                pacienteExternacion.disabled = false;
                pacienteExternacion.value = externacion;
            };
            
            // Seleccionar la edad del paciente
            if (edad == isMinor) {
                pacienteTipoEdadMenor.click();
            } else if (edad == isAdult) {
                pacienteTipoEdadAdulto.click();
            };

            // Resetear valores de familiares
            resetFamiliar();

            // Mostrar bloque de familiar
            showMainFamiliar();

            // Filtrar y mostrar solo las relaciones familiares correspondientes al DNI del paciente seleccionado
            familiarList.forEach(familiar => {
                const fPacienteDni = familiar.getAttribute('f-data-paciente-relacionado');
                if (fPacienteDni === dni) {
                    familiar.style.display = 'block';
                } else {
                    familiar.style.display = 'none';
                }
            });
        });
    });

    // Agregar un evento de escucha al hacer clic en un familiar
    familiarList.forEach(familiar => {
        familiar.addEventListener('click', function() {
            // Obtener los datos del familiar seleccionado
            const fDni = familiar.getAttribute('f-data-dni');
            const fNombre = familiar.getAttribute('f-data-nombre');
            const fApellido = familiar.getAttribute('f-data-apellido');
            const fGenero = familiar.getAttribute('f-data-genero');
            const fRelation = familiar.getAttribute('f-data-relacion')
            
            // Actualizar los campos de entrada con los datos del familiar seleccionado
            inputFName.value = fNombre;
            inputFLast.value = fApellido;
            inputFDni.value = fDni;
            
            // Seleccionar el género del familiar
            if (fGenero == isFemale) {
                buttonFFemale.click();
            } else if (fGenero == isMale) {
                buttonFMale.click();
            };

            // Actualizar la relación del familiar
            inputFRelation.value = fRelation;

            // Mostrar el bloque fecha
            showMainDate();
        });
    });
});

// Redireccionar al hacer clic en el botón "Volver"
buttonReturn.addEventListener('click', (e) => {window.location.href = "{% url 'index' %}";});

// Evitar que el botón de cambiar admisión obtenga el enfoque
pacienteAlternarEstaInternado.addEventListener('focus', () => {
    pacienteAlternarEstaInternado.blur();
});

// Función para cambiar el estado de admisión del paciente
function toggleBooleanAdmited() {
    let booleanValue = pacienteBooleanEstaInternado.value;
    // Cambiar el valor booleano
    booleanValue = booleanValue === "true" ? "false" : "true";
    pacienteBooleanEstaInternado.value = booleanValue;
    pIsAdmitted = booleanValue;

    // Actualizar la apariencia según el nuevo estado de admisión
    if (booleanValue === "true") {
        pacienteAlternarEstaInternado.classList.add('selected');
        pacienteExternacion.disabled = true;
    } else {
        pacienteAlternarEstaInternado.classList.remove('selected');
        pacienteExternacion.disabled = false;
    }
}


pacienteAlternarEstaInternado.addEventListener('click', toggleBooleanAdmited);

buttonPFemale.addEventListener('click', () => {
    buttonPFemale.classList.add('selected');
    buttonPFemale.classList.remove('unselected');
    buttonPMale.classList.add('unselected');
    buttonPMale.classList.remove('selected');
    pacienteGenero.value = isFemale;
});

buttonPMale.addEventListener('click', () => {
    buttonPMale.classList.add('selected');
    buttonPMale.classList.remove('unselected');
    buttonPFemale.classList.add('unselected');
    buttonPFemale.classList.remove('selected');
    pacienteGenero.value = isMale;
});

buttonFFemale.addEventListener('click', () => {
    buttonFFemale.classList.add('selected');
    buttonFFemale.classList.remove('unselected');
    buttonFMale.classList.add('unselected');
    buttonFMale.classList.remove('selected');
    inputFGenre.value = isFemale;
});

buttonFMale.addEventListener('click', () => {
    buttonFMale.classList.add('selected');
    buttonFMale.classList.remove('unselected');
    buttonFFemale.classList.add('unselected');
    buttonFFemale.classList.remove('selected');
    inputFGenre.value = isMale;
});

pacienteTipoEdadMenor.addEventListener('click', () => {
    pacienteTipoEdadMenor.classList.add('selected');
    pacienteTipoEdadMenor.classList.remove('unselected');
    pacienteTipoEdadAdulto.classList.add('unselected');
    pacienteTipoEdadAdulto.classList.remove('selected');
    pacienteTipoEdad.value = isMinor;
});

pacienteTipoEdadAdulto.addEventListener('click', () => {
    pacienteTipoEdadAdulto.classList.add('selected');
    pacienteTipoEdadAdulto.classList.remove('unselected');
    pacienteTipoEdadMenor.classList.add('unselected');
    pacienteTipoEdadMenor.classList.remove('selected');
    pacienteTipoEdad.value = isAdult;
});

function validateWord(word, errorHtml) {
    let error;
    let valid = false;
    if (word === '') {
        error = ' ¡Incompleto!'
    } else if (/[^a-zA-ZñÑ\s]/.test(word)) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        valid = true
    };
    errorHtml.innerHTML = error;
    return valid;
};

function validateDni(dni, errorHtml) {
    let error;
    let valid = false;
    if (dni === '') {
        error = ' ¡Incompleto!'
    } else if (/^(?:\D*(\d{1,6}|\d{9,})\D*|\s*)$|\D/.test(dni)) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        valid = true
    };
    errorHtml.innerHTML = error;
    return valid;
}

function validateGenre(genre, errorHtml) {
    let error;
    let valid = false;
    if (genre === isFemale || genre === isMale) {
        error = '';
        valid = true
    } else {
        error = ' ¡Sin selección!'
    }
    errorHtml.innerHTML = error;
    return valid;
}

function checkAdmitted() {
    if (pacienteExternacion.disabled) {
        return true;
    } else {
        return pacienteExternacion.value;
    }
}

function validateDate(date, errorHtml) {
    let error;
    let valid = false;
    year = parseInt(date.split('-')[0]);
    if (date === '') {
        error = ' ¡Incompleto!'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || year < 1959) {
        error = ' ¡Inválido!' 
    } else {
        error = '';
        valid = true
    };
    errorHtml.innerHTML = error;
    return valid;
}

function validateExit(pExit) {
    if (pacienteExternacion.disabled) {
        let valid = true;
        errorPExit.innerHTML = ''
        return valid;
    } else {
        return validateDate(pExit, errorPExit);
    }
}

function validateAge(age, errorHtml) {
    let error;
    let valid = false;
    if (age === undefined) {
        error = ' ¡Sin selección!'
    } else {
        error = '';
        valid = true
    };
    errorHtml.innerHTML = error;
    return valid;
}

function validateForm(pName, pLast, pDni, pGenre, pAdmission, pExit, pAge, fName, fLast, fDni, fGenre, fRelation, dDate) {
    let validPName = validateWord(pName, errorPName);
    let validPLast = validateWord(pLast, errorPLast);
    let validPDni = validateDni(pDni, errorPDni);
    let validPGenre = validateGenre(pGenre, errorPGenre);
    let validPAdmission = validateDate(pAdmission, errorPAdmission);
    let validPExit = validateExit(pExit);
    let validPAge = validateAge(pAge, errorPAge);
    let validFName = validateWord(fName, errorFName);
    let validFLast = validateWord(fLast, errorFLast);
    let validFDni = validateDni(fDni, errorFDni);
    let validFGenre = validateGenre(fGenre, errorFGenre);
    let validFRelation = validateWord(fRelation, errorFRelation);
    let validDDate = validateDate(dDate, errorDDAte);
    if (
        validPName && validPLast && validPDni && validPGenre &&
        validPAdmission && validPExit && validPAge && 
        validFName && validFLast && validFDni &&  validFGenre &&
        validFRelation && validDDate
    ) {
        return true;
    }
};



buttonConfirm.addEventListener('click', (e) => {
    e.preventDefault();
    let pName = inputPName.value;
    let pLast = inputPLast.value;
    let pDni = pacienteDni.value;
    let pGenre = inputFGenre.value;
    let pAdmission = pacienteInternacion.value;
    let pExit = checkAdmitted();
    let pAge = pacienteTipoEdad.value;
    let fName = inputFName.value;
    let fLast = inputFLast.value;
    let fDni = inputFDni.value;
    let fGenre = inputFGenre.value;
    let fRelation = inputFRelation.value;
    let dDate = inputDDate.value;
    if (validateForm(pName, pLast, pDni, pGenre, pAdmission, pExit, pAge, fName, fLast, fDni, fGenre, fRelation, dDate)) {
        constanciaFormulario.submit();
    }
});
console.log('valor en la línea 527: ', inputPName.value)