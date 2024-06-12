document.addEventListener('DOMContentLoaded', function () {

    container_fav()

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
        icon.classList.add('bi', 'bi-heart');

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

function listaFavoritosServidor() {
    const contenedorFavoritos = document.getElementById('favoritos2');
    contenedorFavoritos.innerHTML = ''; // Limpiar el contenedor de favoritos

    // Realizar las tres llamadas para obtener favoritos de diferentes tipos
    const urls = [
        '/admin/Listafavoritos_admin/restaurantes',
        '/admin/Listafavoritos_admin/emprendimientos',
        '/admin/Listafavoritos_admin/eventos'
    ];

    Promise.all(urls.map(url => fetch(url).then(response => response.json())))
        .then(data => {
            const [restaurantes, emprendimientos, eventos] = data;

            // Combinar los resultados de las tres llamadas en un solo array
            const favoritos = [...new Set([...restaurantes.favoritos, ...emprendimientos.favoritos, ...eventos.favoritos])];

            console.log(favoritos);

            if (favoritos.length === 0) {
                sinFavoritos('favoritos2');
            } else {
                tarjetasFavoritos(favoritos, contenedorFavoritos);
            }

            setTimeout(() => {
                fetch('/admin/obtener_favoritosAdmin')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(fav => {
                            const favIcon = document.querySelector(`.favorite[data-id="${fav.entidad_id}"][data-type="${fav.entidad_tipo}"]`);
                            if (favIcon) {
                                favIcon.style.color = 'red';
                                favIcon.classList.add('active');
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error al obtener los favoritos:', error);
                    });
            }, 300);
        })
        .catch(error => {
            console.error('Error al obtener los favoritos:', error);
        });
}

function tarjetasFavoritos(data, contenedor) {
    data.forEach(tarjeta => {
        const divTarjeta = document.createElement('div');
        divTarjeta.classList.add('container_tarjeta');

        const contenedorTipoImagen = document.createElement('div');
        contenedorTipoImagen.classList.add('tipo_imagen_container');

        const iconHeart = document.createElement('i');
        iconHeart.classList.add('bi', 'bi-heart-fill', 'favorite');
        iconHeart.style.color = '#cecbcb';
        iconHeart.dataset.id = tarjeta.id;
        iconHeart.dataset.type = tarjeta.tipo;

        const divImagen = document.createElement('div');
        divImagen.classList.add('tipo_imagen');

        const imagen = document.createElement('img');
        imagen.src = tarjeta.logo;
        imagen.alt = `Logo del ${tarjeta.tipo}`;

        const divContenido = document.createElement('div');
        divContenido.classList.add('contenido_texto');

        const nombreRes = document.createElement('p');
        nombreRes.textContent = tarjeta.nombre;

        const divContainer = document.createElement('div');
        divContainer.classList.add('container');

        const divRating = document.createElement('div');
        divRating.classList.add('rating2');

        for (let i = 0; i < 5; i++) {
            const estrella = document.createElement('input');
            estrella.type = 'radio';
            estrella.name = `rating${tarjeta.id}`;
            estrella.setAttribute('style', '--c: #ff9933');
            divRating.appendChild(estrella);
        }

        const divBoton = document.createElement('div');
        divBoton.classList.add('container_btn');

        const enlace = document.createElement('a');
        let urlHtml;
        if (tarjeta.tipo === 'restaurante') {
            urlHtml = '/res/restauranteDetalleServidorAdmin';
        } else if (tarjeta.tipo === 'emprendimiento') {
            urlHtml = '/emprende/EmprendeDetalleServidorAdmin';
        } else if (tarjeta.tipo === 'evento') {
            urlHtml = '/evento/eventoDetalleServidorAdmin';
        }
        enlace.href = `${urlHtml}?id=${tarjeta.id}&tipo=${tarjeta.tipo}`;

        const boton = document.createElement('button');
        boton.classList.add('btn');

        const span1 = document.createElement('span');
        span1.classList.add('btn-text-one');
        span1.textContent = "te interesa";

        const span2 = document.createElement('span');
        span2.classList.add('btn-text-two');
        span2.textContent = "mira más!";

        boton.appendChild(span1);
        boton.appendChild(span2);
        enlace.appendChild(boton);
        divBoton.appendChild(enlace);

        divContainer.appendChild(divRating);

        divContenido.appendChild(nombreRes);
        divContenido.appendChild(divContainer);
        divContenido.appendChild(divBoton);

        divImagen.appendChild(imagen);
        contenedorTipoImagen.appendChild(divImagen);
        contenedorTipoImagen.appendChild(iconHeart);
        divTarjeta.appendChild(contenedorTipoImagen);
        divTarjeta.appendChild(divContenido);

        contenedor.appendChild(divTarjeta);
    });
}

// Llamar a la función para cargar los favoritos cuando la página esté lista
document.addEventListener('DOMContentLoaded', listaFavoritosServidor);

function sinFavoritos(containerFav) {
    const container_fav = document.getElementById(containerFav);
    container_fav.classList.add('container_fav');

    const div_vacío = document.createElement('div');
    div_vacío.classList.add('container_noFav');

    const div_icon = document.createElement('div');
    div_icon.classList.add('div_icon');

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-heart');

    const titulo = document.createElement('h2');
    titulo.textContent = 'Aún no tienes listas de favoritos';

    div_icon.appendChild(icon);
    div_vacío.appendChild(div_icon);
    div_vacío.appendChild(titulo);
    container_fav.appendChild(div_vacío);
}
