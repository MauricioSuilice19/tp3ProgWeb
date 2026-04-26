$(document).ready(function () {
    // Función para validar nombre
    function validateName() {
        var value = $('#name').val();
        var regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
        if (regex.test(value)) {
            $('#name').removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            $('#name').removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }

    // Función para validar email
    function validateEmail() {
        var value = $('#email').val();
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(value)) {
            $('#email').removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            $('#email').removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }

    // Función para validar teléfono
    function validatePhone() {
        var value = $('#phone').val();
        var regex = /^[0-9]{8,15}$/;
        if (regex.test(value)) {
            $('#phone').removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            $('#phone').removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }

    // Función para validar mensaje
    function validateMessage() {
        var value = $('#message').val();
        if (value.length >= 10) {
            $('#message').removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            $('#message').removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }

    // Validaciones en tiempo real con .on('input') y .on('blur') para cada campo
    $('#name').on('input blur', validateName);
    $('#email').on('input blur', validateEmail);
    $('#phone').on('input blur', validatePhone);
    $('#message').on('input blur', validateMessage);


    $('#contactForm').on('submit', function (event) {
        event.preventDefault(); // Evita recargar la página

        // Validar todos los campos antes de enviar
        var isNameValid = validateName();
        var isEmailValid = validateEmail();
        var isPhoneValid = validatePhone();
        var isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            return; // No enviar si hay errores
        }

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
            
            // Limpia las clases de validación
            $('#name, #email, #phone, #message').removeClass('is-valid is-invalid');
        }, 2000);
    });

    // Alternar Modo Oscuro
    $('#modoOscuroBtn').click(function () {
        let $html = $('html');
        if ($html.attr('data-bs-theme') === 'dark') {
            $html.removeAttr('data-bs-theme'); // Vuelve a modo claro
            $(this).find('i').removeClass('bi-sun').addClass('bi-moon'); 
        } else {
            $html.attr('data-bs-theme', 'dark'); // Activa modo oscuro nativo de Bootstrap
            $(this).find('i').removeClass('bi-moon').addClass('bi-sun'); 
        }
        
        $('body').toggleClass('dark-mode'); // Mantiene compatibilidad con los estilos CSS manuales
    });
});