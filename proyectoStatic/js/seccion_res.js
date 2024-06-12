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
    const swiper3 = document.getElementById('swiper3');

    tarjetas_swiper(datosTarjetas, swiper);
    tarjetas_swiper(restaurantesTematicos, swiper2);
    tarjetas_swiper(restaurantesVista, swiper3);
    manejarFavoritos('favoritosRes');

})

