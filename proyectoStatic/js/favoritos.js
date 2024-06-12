document.addEventListener('DOMContentLoaded', function () {
 
    container_fav();
    // Agregar event listener para capturar clics en favoritos
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('favorite')) {
            const eventId = event.target.getAttribute('data-event-id');
            getFavorite(eventId);
        }
    });

});
function container_fav() {

    // Obtener los eventos favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosRes = JSON.parse(localStorage.getItem('favoritosRes')) || [];
    const favoritosEm = JSON.parse(localStorage.getItem('favoritosEm')) || [];

    if (favoritos.length === 0 && favoritosRes.length === 0 && favoritosEm.length === 0) {
        const container_fav = document.querySelector('#favoritos');
        container_fav.classList.add('container_fav');

        const div_vacío = document.createElement('div');
        div_vacío.classList.add('container_noFav');

        const div_icon = document.createElement('div');
        div_icon.classList.add('div_icon');

        const icon = document.createElement('i');
        icon.classList.add('bi','bi-heart');

        const titulo = document.createElement('h2');
        titulo.textContent = 'Aún no tienes listas de favoritos';

        div_icon.appendChild(icon);
        div_vacío.appendChild(div_icon);
        div_vacío.appendChild(titulo);
        container_fav.appendChild(div_vacío);
    } else {
        renderFavorite(favoritos, window.datosEventos);
        renderFavorite(favoritos, window.eventosTecnologicos);
        renderFavorite(favoritosRes, window.datosTarjetas);
        renderFavorite(favoritosRes, window.restaurantesTematicos);
        renderFavorite(favoritosRes, window.restaurantesVista);
        renderFavorite(favoritosEm, window.datosEmpredimientos);
        renderFavorite(favoritosEm, window.empredimientosArtesania);
    }


}
function renderFavorite(lista, type) {
    // Iterar sobre los eventos favoritos y mostrarlos en la interfaz de usuario
    lista.forEach(function (eventoId) {

        const idNumero = parseInt(eventoId);
        const evento = type.find(e => e.id === idNumero);
        console.log(evento);
        if (evento) {
            // Crear elementos HTML para mostrar la información del evento
            const container_fav = document.querySelector('#favoritos');

            let cardFavorite = document.createElement('div');
            cardFavorite.classList.add('cardFavorite');

            let content_img = document.createElement('div');
            content_img.classList.add('content-img');

            let imgFavorito = document.createElement('img');
            imgFavorito.src = evento.galeria[3];
            imgFavorito.alt = `Imagen de ${evento.titulo}`;

            const content_favorite = document.createElement('div');
            content_favorite.classList.add('content-favorite');

            const favorite = document.createElement('i');
            favorite.classList.add("bi", "bi-heart-fill", "favorite");
            favorite.setAttribute('data-event-id', evento.id);

            let titulo = document.createElement('h3');
            titulo.textContent = evento.titulo;

            const rating = document.createElement('div');
            rating.classList.add("rating");

            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add("bi", "bi-star-fill", "star");
                rating.appendChild(star);
            }

            let enlace = document.createElement('a');
            enlace.classList.add('enlaceFav');
            enlace.href = `${evento.enlace}?id=${evento.id}`;
            enlace.textContent = 'Ver detalles';

            content_img.appendChild(imgFavorito);
            content_favorite.appendChild(favorite);
            content_img.appendChild(content_favorite);
            cardFavorite.appendChild(content_img);
            cardFavorite.appendChild(titulo);
            cardFavorite.appendChild(rating);
            cardFavorite.appendChild(enlace);
            container_fav.appendChild(cardFavorite);

        }
    });
}

function getFavorite(eventId) {
    // Obtener los eventos favoritos del localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let favoritosRes = JSON.parse(localStorage.getItem('favoritosRes')) || [];
    let favoritosEm = JSON.parse(localStorage.getItem('favoritosEm')) || [];

    // Verificar si el evento está en alguna de las listas
    const indexFavoritos = favoritos.indexOf(eventId);
    const indexFavoritosRes = favoritosRes.indexOf(eventId);
    const indexFavoritosEm = favoritosEm.indexOf(eventId);


    // Eliminar el evento de la lista correspondiente
    if (indexFavoritos !== -1) {
        favoritos.splice(indexFavoritos, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    } else if (indexFavoritosRes !== -1) {
        favoritosRes.splice(indexFavoritosRes, 1);
        localStorage.setItem('favoritosRes', JSON.stringify(favoritosRes));
    } else if (indexFavoritosEm !== -1) {
        favoritosEm.splice(indexFavoritosEm, 1);
        localStorage.setItem('favoritosEm', JSON.stringify(favoritosEm));
    }

    // Eliminar el elemento del DOM
    const cardFavorite = event.target.closest('.cardFavorite');
    if (cardFavorite) {
        cardFavorite.remove();
    }
    location.reload();
}