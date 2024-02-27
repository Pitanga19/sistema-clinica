const mainCertificatesContainer = document.querySelector('.main__certificates-container');
const arrayButtonEdit = document.querySelectorAll('.edit');
const buttonReturn = document.getElementById('return');
const inputConstanciaId = document.getElementById('constancia-id');

arrayButtonEdit.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Evita la acción por defecto (por ejemplo, seguir un enlace)
        const constanciaId = button.dataset.constanciaId;
        inputConstanciaId.value = constanciaId;
        console.log('edit de la constancia ' + constanciaId)
        window.location.href = newUrl + "?id_constancia_recibida=" + constanciaId;
    });
});

buttonReturn.addEventListener('click', (e) => {window.location.href = "{% url 'index' %}";});
