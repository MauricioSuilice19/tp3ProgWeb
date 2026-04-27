$(document).ready(function(){
  $(".filter-btn").click(function(){
    var category = $(this).attr("data-filter");
    if(category == "all"){
      $(".blog-item").show("slow");
    } else {
      $(".blog-item").hide("slow");
      $("." + category).show("slow");
    }
  });
});
$(window).on("scroll", function(){
  $(".blog-item").each(function(){
    if($(this).offset().top < $(window).scrollTop() + $(window).height() - 100){
      $(this).addClass("animate__animated animate__fadeInUp");
    }
  });
});
$(document).ready(function(){
  $("#commentForm").on("submit", function(e){
    e.preventDefault();
    var name = $("#name").val();
    var comment = $("#comment").val();
    if(name && comment){
      $(".card-body").prepend(
        "<div class='mb-3'><strong>" + name + ":</strong> " + comment + "</div>"
      );
      $("#name").val("");
      $("#comment").val("");
    }
  });
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