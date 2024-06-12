var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: false,
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
});


document.addEventListener('DOMContentLoaded', function () {

    const swiper = document.getElementById('swiper');
    const swiper2 = document.getElementById('swiper2');
    const detalleEventoUrl = document.getElementById('detalle-evento-url').getAttribute('data-url');

    tarjetas_swiper(datosEventos, swiper,detalleEventoUrl);
    tarjetas_swiper(eventosTecnologicos, swiper2,detalleEventoUrl);
    manejarFavoritos('favoritos');

})

function cargarEventos(tipo) {
    // Redirige a la página de eventos con el tipo como parámetro
    const url = document.getElementById('data-container').getAttribute('data-perfil-url');

    window.location.href = `${url}?tipo=${encodeURIComponent(tipo)}`;
}