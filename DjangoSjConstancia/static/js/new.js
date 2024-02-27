const form = document.getElementById('form-new');

const inputSearchPatient = document.getElementById('patient-search');
const patientList = Array.from(document.getElementById('patient-list').getElementsByTagName('li'));
const buttonOpenNewPatient = document.getElementById('open-new-patient')

const inputNewPatient = document.querySelectorAll('.new-patient');
const inputPName = document.getElementById('p-name');
const inputPLast = document.getElementById('p-last');
const inputPDni = document.getElementById('p-dni');
const inputPGenre = document.getElementById('p-genre');
const buttonPFemale = document.getElementById('p-genre-female');
const buttonPMale = document.getElementById('p-genre-male');
const inputPAdmission = document.getElementById('p-admission');
const inputPExit = document.getElementById('p-exit');
const booleanAdmitted = document.getElementById('p-boolean-admitted');
const buttonToggleAdmitted = document.getElementById('p-toggle-admitted');
const inputPAge = document.getElementById('p-age');
const buttonPAdult = document.getElementById('p-age-adult');
const buttonPMinor = document.getElementById('p-age-minor');

const mainFamiliar = document.getElementById('main__familiar');
const inputSearchRelationFamiliar = document.getElementById('relation-familiar-search');
const familiarList = Array.from(document.getElementById('relation-familiar-list').getElementsByTagName('li'));
const buttonSelectExistingFamiliar = document.getElementById('select-existing-familiar');
const buttonOpenNewFamiliar = document.getElementById('open-new-familiar');

const inputNewFamiliar = document.querySelectorAll('.new-familiar');
const inputFName = document.getElementById('f-name');
const inputFLast = document.getElementById('f-last');
const inputFDni = document.getElementById('f-dni');
const inputFGenre = document.getElementById('f-genre');
const buttonFFemale = document.getElementById('f-genre-female');
const buttonFMale = document.getElementById('f-genre-male');
const inputFRelation = document.getElementById('f-relation');
const inputDDate = document.getElementById('d-date');

const errorPName = document.getElementById('error-p-name');
const errorPLast = document.getElementById('error-p-last');
const errorPDni = document.getElementById('error-p-dni');
const errorPGenre = document.getElementById('error-p-genre');
const errorPAdmission = document.getElementById('error-p-admission');
const errorPExit = document.getElementById('error-p-exit');
const errorPAge = document.getElementById('error-p-age');
const errorFName = document.getElementById('error-f-name');
const errorFLast = document.getElementById('error-f-last');
const errorFDni = document.getElementById('error-f-dni');
const errorFGenre = document.getElementById('error-f-genre');
const errorFRelation = document.getElementById('error-f-relation');

const mainDate = document.getElementById('main__date');
const errorDDAte= document.getElementById('error-d-date');

const buttonReturn = document.getElementById('return');
const buttonConfirm = document.getElementById('confirm');


let pIsAdmitted = false;

const isFemale = 'femenino';
const isMale = 'masculino';
const isMinor = 'menor';
const isAdult = 'adulto';


function hideNewPatient(){
    buttonOpenNewPatient.classList.remove('selected');
    inputNewPatient.forEach(elemento => {
        elemento.classList.add('invisible');
    });
}

function showNewPatient(){
    buttonOpenNewPatient.classList.add('selected');
    inputNewPatient.forEach(elemento => {
        elemento.classList.remove('invisible');
    });
    inputSearchPatient.value = ''
    inputPName.value = '';
    inputPLast.value = '';
    inputPDni.value = '';
    inputPGenre.value = '';
    buttonPFemale.classList.remove('selected');
    buttonPFemale.classList.remove('unselected');
    buttonPMale.classList.remove('selected');
    buttonPMale.classList.remove('unselected');
    inputPAdmission.value = '';
    inputPExit.value = '';
    booleanAdmitted.value = '';
    buttonToggleAdmitted.classList.remove('selected');
    inputPAge.value = '';
    buttonPAdult.classList.remove('selected');
    buttonPAdult.classList.remove('unselected');
    buttonPMinor.classList.remove('selected');
    buttonPMinor.classList.remove('unselected');
    familiarList.forEach(familiar => {
        familiar.style.display = 'none';
    });
}

function hideMainFamiliar(){
    mainFamiliar.classList.add('invisible');
}

function showMainFamiliar(){
    mainFamiliar.classList.remove('invisible');
}

function hideNewFamiliar(){
    buttonOpenNewFamiliar.classList.remove('selected');
    inputNewFamiliar.forEach(elemento => {
        elemento.classList.add('invisible');
    });
}

function showNewFamiliar(){
    buttonOpenNewFamiliar.classList.add('selected');
    inputNewFamiliar.forEach(elemento => {
        elemento.classList.remove('invisible');
    });
}

function resetFamiliar(){
    inputFName.value = '';
    inputFLast.value = '';
    inputFDni.value = '';
    buttonFFemale.classList.remove('selected');
    buttonFFemale.classList.remove('unselected');
    buttonFMale.classList.remove('selected');
    buttonFMale.classList.remove('unselected');
    inputFRelation.value = '';
}
    
function hideMainDate(){
    mainDate.classList.add('invisible');
}

function showMainDate(){
    mainDate.classList.remove('invisible');
}

hideNewPatient();
hideMainFamiliar();
hideNewFamiliar();

buttonOpenNewPatient.addEventListener('click', () => {
    showNewPatient();
})

buttonSelectExistingFamiliar.addEventListener('click', () => {
    hideNewFamiliar();
})

buttonOpenNewFamiliar.addEventListener('click', () => {
    resetFamiliar();
    showNewFamiliar();
})


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
    inputSearchPatient.addEventListener('input', function() {
        // Obtener el texto de búsqueda y convertirlo a minúsculas
        const searchText = inputSearchPatient.value.toLowerCase();

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
            inputPDni.value = dni;
            
            // Seleccionar el género del paciente
            if (genero == isFemale) {
                buttonPFemale.click()
            } else if (genero == isMale) {
                buttonPMale.click()
            };
            
            // Actualizar la fecha de internación del paciente
            inputPAdmission.value = internacion;
            
            // Controlar la fecha de salida del paciente
            if (externacion === null || externacion === "null") {
                buttonToggleAdmitted.classList.add('selected');
                inputPExit.disabled = true;
                inputPExit.value = '';
            } else {
                buttonToggleAdmitted.classList.remove('selected');
                inputPExit.disabled = false;
                inputPExit.value = externacion;
            };
            
            // Seleccionar la edad del paciente
            if (edad == isMinor) {
                buttonPMinor.click();
            } else if (edad == isAdult) {
                buttonPAdult.click();
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

    // Mostrar bloque de familiar solo si el paciente tiene un dni de al menos 7 dígitos
    if (inputPDni.value.length >= 1) {
        console.log(inputPDni.value.length);
        showMainFamiliar();
    } else {
        hideMainFamiliar();
        resetFamiliar();
    }

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
buttonToggleAdmitted.addEventListener('focus', () => {
    buttonToggleAdmitted.blur();
});

// Función para cambiar el estado de admisión del paciente
function toggleBooleanAdmited() {
    let booleanValue = booleanAdmitted.value;
    // Cambiar el valor booleano
    booleanValue = booleanValue === "true" ? "false" : "true";
    booleanAdmitted.value = booleanValue;
    pIsAdmitted = booleanValue;

    // Actualizar la apariencia según el nuevo estado de admisión
    if (booleanValue === "true") {
        buttonToggleAdmitted.classList.add('selected');
        inputPExit.disabled = true;
    } else {
        buttonToggleAdmitted.classList.remove('selected');
        inputPExit.disabled = false;
    }
}


buttonToggleAdmitted.addEventListener('click', toggleBooleanAdmited);

buttonPFemale.addEventListener('click', () => {
    buttonPFemale.classList.add('selected');
    buttonPFemale.classList.remove('unselected');
    buttonPMale.classList.add('unselected');
    buttonPMale.classList.remove('selected');
    inputPGenre.value = isFemale;
});

buttonPMale.addEventListener('click', () => {
    buttonPMale.classList.add('selected');
    buttonPMale.classList.remove('unselected');
    buttonPFemale.classList.add('unselected');
    buttonPFemale.classList.remove('selected');
    inputPGenre.value = isMale;
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

buttonPMinor.addEventListener('click', () => {
    buttonPMinor.classList.add('selected');
    buttonPMinor.classList.remove('unselected');
    buttonPAdult.classList.add('unselected');
    buttonPAdult.classList.remove('selected');
    inputPAge.value = isMinor;
});

buttonPAdult.addEventListener('click', () => {
    buttonPAdult.classList.add('selected');
    buttonPAdult.classList.remove('unselected');
    buttonPMinor.classList.add('unselected');
    buttonPMinor.classList.remove('selected');
    inputPAge.value = isAdult;
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
    if (inputPExit.disabled) {
        return true;
    } else {
        return inputPExit.value;
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
    if (inputPExit.disabled) {
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
    let pDni = inputPDni.value;
    let pGenre = inputFGenre.value;
    let pAdmission = inputPAdmission.value;
    let pExit = checkAdmitted();
    let pAge = inputPAge.value;
    let fName = inputFName.value;
    let fLast = inputFLast.value;
    let fDni = inputFDni.value;
    let fGenre = inputFGenre.value;
    let fRelation = inputFRelation.value;
    let dDate = inputDDate.value;
    if (validateForm(pName, pLast, pDni, pGenre, pAdmission, pExit, pAge, fName, fLast, fDni, fGenre, fRelation, dDate)) {
        form.submit();
    }
});
console.log('valor en la línea 527: ', inputPName.value)