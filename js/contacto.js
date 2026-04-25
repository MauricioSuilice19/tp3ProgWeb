$(document).ready(function () {
    $('#contactForm').on('submit', function (event) {
        event.preventDefault(); // Evita recargar la página

        let $submitBtn = $('#submitBtn');
        let $btnText = $('#btnText');
        let $btnSpinner = $('#btnSpinner');
        let form = this; // Guardamos la referencia al formulario

        // Deshabilita el botón, cambia el texto y muestra el spinner
        $submitBtn.prop('disabled', true);
        $btnText.text('Enviando...');
        $btnSpinner.removeClass('d-none');

        // Simula una petición de red con duración de 2 segundos
        setTimeout(() => {
            $submitBtn.prop('disabled', false);
            $btnText.text('Enviar Mensaje');
            $btnSpinner.addClass('d-none');

            var successModal = new bootstrap.Modal(document.getElementById('modal-success'));
            successModal.show();
            
            form.reset(); // Limpia los campos del formulario
        }, 2000);
    });
});