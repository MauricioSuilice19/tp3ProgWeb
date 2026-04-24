$(document).ready(function () {
  // FILTROS DE DESTINOS
  $(".boton-filtro").click(function () {
    // Tomo el filtro del botón que se clickeó (ej: montaña, ciudad, etc.)
    let filtro = $(this).data("filter");

    // Marco visualmente el botón activo
    $(".boton-filtro").removeClass("active");
    $(this).addClass("active");

    // Si el usuario eligió "todos", muestro todo
    if (filtro === "todos") {
      $(".destino").fadeIn(300);
    } else {
      // Si no, oculto todos y muestro solo los que coinciden
      $(".destino").hide();
      $("." + filtro).fadeIn(300);
    }
  });

  ///BOTÓN "VER MÁS" (MODAL)

  $(".ver-mas-btn").click(function () {
    // Obtengo la info del destino desde los data-*
    let destino = $(this).data("destino");
    let precio = $(this).data("precio");
    let duracion = $(this).data("duracion");
    let descripcion = $(this).data("descripcion");

    // Aqui va la imagen
    let imagen = $(this).closest(".card").find("img").attr("src");

    // Cargo esa info dentro del modal
    $("#modalTitulo").text(destino);
    $("#modalPrecio").text(precio);
    $("#modalDuracion").text(duracion);
    $("#modalImagen").attr("src", imagen);
    $("#modalDescripcion").text(descripcion);
    // Abro el modal usando Bootstrap
    let modal = new bootstrap.Modal(document.getElementById("destinoModal"));
    modal.show();
  });
});
