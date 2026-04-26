$(document).ready(function () {
  let mesesSeleccionados = [];

  const meses = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ];

  const mesActual = new Date().getMonth();

  // Generar lista con checkboxes
  let listaHtml = `
    <li>
      <div class="form-check mes-item">
        <input class="form-check-input mes-check" type="checkbox" value="En cualquier momento" id="mes-cualquiera">
        <label class="form-check-label w-100" for="mes-cualquiera">En cualquier momento</label>
      </div>
    </li>
  `;

  for (let i = mesActual; i < 12; i++) {
    let nombreMes = meses[i][0].toUpperCase() + meses[i].slice(1);
    listaHtml += `
      <li>
        <div class="form-check mes-item">
          <input class="form-check-input mes-check" type="checkbox" value="${nombreMes}" id="mes-${i}">
          <label class="form-check-label w-100" for="mes-${i}">${nombreMes}</label>
        </div>
      </li>
    `;
  }

  listaHtml += `
    <li><hr class="dropdown-divider"></li>
    <li><button class="btn btn-sm btn-primary w-100" id="btnAplicar">Aplicar</button></li>
  `;

  $("#listaMeses").html(listaHtml);

  // Click en toda la fila (fix doble toggle)
  $(document).on("click", ".mes-item", function (e) {
    if ($(e.target).is("input") || $(e.target).is("label")) return;

    e.stopPropagation();
    let checkbox = $(this).find(".mes-check");
    checkbox.prop("checked", !checkbox.prop("checked")).trigger("change");
  });

  // Evitar cierre al hacer click en checkbox
  $(document).on("click", ".mes-check", function (e) {
    e.stopPropagation();
  });

  // ✅ NUEVO: lógica exclusiva
  $(document).on("change", ".mes-check", function () {
    let valor = $(this).val();

    if (valor === "En cualquier momento" && $(this).is(":checked")) {
      $(".mes-check").not(this).prop("checked", false);
    } else if (valor !== "En cualquier momento" && $(this).is(":checked")) {
      $("#mes-cualquiera").prop("checked", false);
    }
  });

  // Botón aplicar
  $(document).on("click", "#btnAplicar", function (e) {
    e.preventDefault();
    e.stopPropagation();

    mesesSeleccionados = [];
    $(".mes-check:checked").each(function () {
      mesesSeleccionados.push($(this).val());
    });

    if (mesesSeleccionados.length === 0) {
      $("#dropdownMes").text("Mes de salida");
    } else if (mesesSeleccionados.includes("En cualquier momento")) {
      $("#dropdownMes").text("Mes de salida – En cualquier momento");
    } else if (mesesSeleccionados.length === 1) {
      $("#dropdownMes").text("Mes de salida – " + mesesSeleccionados[0]);
    } else {
      $("#dropdownMes").text("Mes de salida – Múltiples");
    }

    bootstrap.Dropdown
      .getInstance(document.getElementById('dropdownMes'))
      .hide();
  });

  // Botón buscar
  $("#btnBuscar").click(function () {
    let destino = $("#destino").val();
    let pasajeros = $("#pasajeros").val();

    if (destino && pasajeros && mesesSeleccionados.length > 0) {
      alert("Buscando paquetes para: " + destino +
            "\nMes de salida: " + mesesSeleccionados.join(", ") +
            "\nPasajeros: " + pasajeros);
    } else {
      alert("Por favor completa todos los campos.");
    }
  });

  // Hover carrusel
  $(".carousel-item img").hover(
    function () {
      $(this).css({"transform":"scale(1.05)","transition":"transform 0.3s"});
    },
    function () {
      $(this).css({"transform":"scale(1)"});
    }
  );

  // Datos de paquetes
const paquetes = {
  bariloche: {
    titulo: "Bariloche – 5 días",
    resumen: "Duración: 5 días<br>Destino: Bariloche<br>Incluye: Hotel + Excursiones",
    vuelo: "No aplica (paquete terrestre)",
    hotel: "Hotel en Bariloche – Excursiones incluidas",
    incluye: "<ul><li>Hotel</li><li>Excursiones</li></ul>"
  },
  salinas: {
    titulo: "Salinas Grandes – 1 día",
    resumen: "Duración: 1 día<br>Destino: Salinas Grandes<br>Incluye: Transporte + Guía",
    vuelo: "Transporte terrestre",
    hotel: "No aplica (excursión de un día)",
    incluye: "<ul><li>Transporte</li><li>Guía</li></ul>"
  },
  purmamarca: {
    titulo: "Purmamarca – 2 días",
    resumen: "Duración: 2 días<br>Destino: Purmamarca<br>Incluye: Hotel + Traslados",
    vuelo: "Transporte terrestre",
    hotel: "Hotel en Purmamarca – Traslados incluidos",
    incluye: "<ul><li>Hotel</li><li>Traslados</li></ul>"
  },
  yala: {
    titulo: "Yala – 2 días",
    resumen: "Duración: 2 días<br>Destino: Yala<br>Incluye: Hotel + Excursiones",
    vuelo: "Transporte terrestre",
    hotel: "Hotel en Yala – Excursiones incluidas",
    incluye: "<ul><li>Hotel</li><li>Excursiones</li></ul>"
  }
};


  // Crear modal genérico si no existe
  if ($("#modalPaquete").length === 0) {
    $("body").append(`
      <div class="modal fade" id="modalPaquete" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="modalTitulo"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="modalContenido"></div>
          </div>
        </div>
      </div>
    `);
  }

  // Evento click en botones
  $(document).on("click", ".ver-paquete", function (e) {
    e.preventDefault();
    let key = $(this).data("paquete");
    let paquete = paquetes[key];

    if (paquete) {
      $("#modalTitulo").html(paquete.titulo);
      $("#modalContenido").html(`
        <h6>Resumen</h6><p>${paquete.resumen}</p>
        <h6>Vuelo</h6><p>${paquete.vuelo}</p>
        <h6>Hotel</h6><p>${paquete.hotel}</p>
        <h6>El precio incluye</h6>${paquete.incluye}
        <hr>
        <h6>Formulario de contacto</h6>
        <form>
          <div class="mb-3">
            <label class="form-label">Nombre completo</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono / WhatsApp</label>
            <input type="tel" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-success">Enviar consulta</button>
        </form>
      `);

      // Mostrar modal
      let modal = new bootstrap.Modal(document.getElementById('modalPaquete'));
      modal.show();
    }
  });

});