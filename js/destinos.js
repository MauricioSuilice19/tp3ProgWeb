$(document).ready(function () {
  // rating aleatorio (entre 3 y 5)
  $(".destino").each(function () {
    let rating = Math.floor(Math.random() * 3) + 3;

    // guardo el rating
    $(this).attr("data-rating", rating);

    // genero estrellas
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        estrellas += '<i class="bi bi-star-fill"></i>';
      } else {
        estrellas += '<i class="bi bi-star"></i>';
      }
    }

    // lo muestro en la card
    $(this).find(".rating").html(estrellas);
  });

  // Filtro de destinos
  $(".boton-filtro").click(function () {
    let filtro = $(this).data("filter");

    // boton activo
    $(".boton-filtro").removeClass("active");
    $(this).addClass("active");

    if (filtro === "todos") {
      $(".destino").fadeIn(300);
    } else {
      $(".destino").hide();
      $("." + filtro).fadeIn(300);
    }
  });

  /// BOTON "VER MAS" (MODAL)

  $(".ver-mas-btn").click(function () {
    // efecto click en card
    let card = $(this).closest(".destino-card");
    card.addClass("click-anim");

    setTimeout(() => {
      card.removeClass("click-anim");
    }, 200);

    // datos
    let destino = $(this).data("destino");
    let precio = $(this).data("precio");
    let duracion = $(this).data("duracion");
    let descripcion = $(this).data("descripcion");

    // imagen
    let imagen = $(this).closest(".card").find("img").attr("src");

    // rating
    let rating = $(this).closest(".destino").data("rating");

    // estrellas modal
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        estrellas += '<i class="bi bi-star-fill"></i>';
      } else {
        estrellas += '<i class="bi bi-star"></i>';
      }
    }

    // cargo datos en el modal
    $("#modalTitulo").text(destino);
    $("#modalPrecio").text(precio);
    $("#modalDuracion").text(duracion);
    $("#modalImagen").attr("src", imagen);
    $("#modalDescripcion").text(descripcion);
    $("#modalRating").html(estrellas);

    // abro modal
    let modal = new bootstrap.Modal(document.getElementById("destinoModal"));
    modal.show();
  });

  /// Animacion al hacer scroll

  $(window).on("scroll", function () {
    $(".destino").each(function () {
      let posicion = $(this).offset().top;
      let scroll = $(window).scrollTop();
      let alturaPantalla = $(window).height();

      if (scroll + alturaPantalla > posicion + 100) {
        $(this).addClass("visible");
      }
    });
  });

  // ejecuta al cargar
  $(window).trigger("scroll");

  /// Scroll a seccion precios

  $(".tabla-precios tbody tr").click(function () {
    let destino = $(this).data("destino");

    let posicion = $("#" + destino).offset().top;

    $("html, body").animate(
      {
        scrollTop: posicion - 80,
      },
      600,
    );
  });

  // Modo Oscuro

  $("#modoOscuroBtn").click(function () {
    $("body").toggleClass("dark-mode");
  });
});
