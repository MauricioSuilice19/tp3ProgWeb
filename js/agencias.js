
$(document).ready(function() {
    // --- Sistema de Giro (Toggle Flip) ---
    // 1. Escuchamos el evento 'click' en cualquier botón con la clase '.btn-flip'
    $('.btn-flip').on('click', function() {
        
        // 2. $(this) es el botón presionado. 
        // .closest() busca hacia arriba el contenedor más cercano con la clase '.flip-card-inner'.
        // .toggleClass() añade la clase 'is-flipped' si no la tiene, o la quita si ya la tiene.
        $(this).closest('.flip-card-inner').toggleClass('is-flipped');
    });

    // --- Sistema de Calificación (Rating System) ---
    // 3. Escuchamos el 'click' en cualquier icono con la clase '.star'
    $('.star').on('click', function() {
        
        // 4. Guardamos en una variable el contenedor de las estrellas (el div 'rating-stars')
        // de la tarjeta donde el usuario hizo click.
        let container = $(this).parent();
        
        // 5. Obtenemos el valor numérico de la estrella tocada (del 1 al 5)
        let valor = $(this).data('value');

        // 6. Buscamos todas las estrellas dentro de ese contenedor y les quitamos la clase 'active'
        // Esto sirve para "limpiar" la selección anterior antes de marcar la nueva.
        container.find('.star').removeClass('active');

        // 7. A la estrella que tocamos, le añadimos la clase 'active' (se pone amarilla)
        $(this).addClass('active');

        // 8. .prevAll() busca todas las estrellas que están ANTES (a la izquierda) de la que tocamos
        // y también les pone la clase 'active'.
        $(this).prevAll().addClass('active');

    });
});