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
    
    tarjetas_swiper(datosEmpredimientos, swiper);
    tarjetas_swiper(empredimientosArtesania, swiper2);;
    manejarFavoritos('favoritosEm');
});
