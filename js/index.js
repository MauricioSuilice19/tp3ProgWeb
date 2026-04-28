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