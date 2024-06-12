document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    Categoria(window.datosTarjetas, idParam);
    Categoria(window.restaurantesTematicos, idParam);
    Categoria(window.restaurantesVista, idParam);

    slider_tarjetas();
    generarDatos();


});


function generarDatos() {
    // Obtiene el ID del evento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id')); // Convierte el ID a un número entero

    function obtenerDatos(typeRes, id) {
        // Busca el evento correspondiente en window.datosEventos por su ID
        const type_resta = typeRes.find(type_resta => type_resta.id === id);

        // Verifica si se encontró el evento correspondiente
        if (type_resta) {

            document.getElementById('title').textContent = type_resta.titulo;
            document.querySelector('#horario').textContent = type_resta.horario;
            document.querySelector('#contacto').textContent = type_resta.contacto;
            document.querySelector('#comidas').textContent = type_resta.comida;
            document.querySelector('#correo').textContent = type_resta.correo;

            sitio_web = document.querySelector('#web');
            sitio_web.href = type_resta.pagina;
            sitio_web.target = '_blank';


            enlace = document.querySelector('#red1');

            if (type_resta.redes[0] !== "") {
                enlace.href = type_resta.redes[0];
                enlace.target = "_blank";
            } else {
                enlace.style.display = 'none';
            }


            enlace2 = document.querySelector('#red2');

            if (type_resta.redes[1] !== "") {
                enlace2.href = type_resta.redes[1];
                enlace2.target = "_blank";
            } else {
                enlace2.style.display = 'none';
            }

            const location_lista = document.getElementById("location");
            type_resta.ubicacion.forEach(ubicacion => {
                const nuevaLi = document.createElement("li");
                nuevaLi.textContent = ubicacion;
                location_lista.appendChild(nuevaLi);

            });


        }
    }
    obtenerDatos(window.datosTarjetas,restaId);
    obtenerDatos(window.restaurantesTematicos,restaId);
    obtenerDatos(window.restaurantesVista,restaId);
}

function popup_menu() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id')); // Convierte el ID a un número entero
    popupmenu(restaId);
}

function popupmenu(eventId) {

    let restaurante;

    if (eventId >= 1 && eventId <= window.datosTarjetas.length) {
        restaurante = window.datosTarjetas.find(rest => rest.id === eventId);
    } 
    else if (eventId >= (window.datosTarjetas.length + 1) && eventId <= (window.datosTarjetas.length + window.restaurantesVista.length)) {
        const eventoIndex = eventId - window.datosTarjetas.length - 1; // Corregir el índice
        restaurante = window.restaurantesVista[eventoIndex]; // No es necesario restar 1 aquí
    } 
    else if(eventId >= (window.datosTarjetas.length + window.restaurantesVista.length + 1) && eventId <= (window.datosTarjetas.length + window.restaurantesVista.length + window.restaurantesTematicos.length)){
        const eventoIndex = eventId - window.datosTarjetas.length - window.restaurantesVista.length - 1; // Corregir el índice
        restaurante = window.restaurantesTematicos[eventoIndex]; // No es necesario restar 1 aquí
    }
    else {
        console.error("ID de evento no válido");
        return;
    }
    

    let menuHtml = '<h3>Nuestro Menú</h3>';
    let i = 1;

    if (restaurante.menu.length >= 2) {
        restaurante.menu.forEach(menuItem => {
            menuHtml += `<h4>Conoce el menú ${i}</h4>`;
            menuHtml += `<p class="screen"> 🍽️<a href="${menuItem}" target="_blank">Ver Menú</a></p>`;
            i++;
        });
    } else {
        restaurante.menu.forEach(menuItem => {
            menuHtml += `<p class="screen"> 🍽️<a href="${menuItem}" target="_blank">Ver Menú</a></p>`;
        });
    }

    Swal.fire({
        title: `<span class="custom-title">${restaurante.titulo}</span>`,
        html: `<div class="div-swal">${menuHtml}</div>`,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue', // Clase CSS para el borde del SweetAlert
            title: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}



function popup_nosotros() {

    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id'));
    popupNosotros(restaId);
    
}

function popupNosotros(eventId){

    let type_resta;

    if (eventId >= 1 && eventId <= window.datosTarjetas.length) {
        type_resta = window.datosTarjetas.find(rest => rest.id === eventId);
    } 
    else if (eventId >= (window.datosTarjetas.length + 1) && eventId <= (window.datosTarjetas.length + window.restaurantesVista.length)) {
        const eventoIndex = eventId - window.datosTarjetas.length - 1; // Corregir el índice
        type_resta = window.restaurantesVista[eventoIndex]; // No es necesario restar 1 aquí
    } 
    else if(eventId >= (window.datosTarjetas.length + window.restaurantesVista.length + 1) && eventId <= (window.datosTarjetas.length + window.restaurantesVista.length + window.restaurantesTematicos.length)){
        const eventoIndex = eventId - window.datosTarjetas.length - window.restaurantesVista.length - 1; // Corregir el índice
        type_resta = window.restaurantesTematicos[eventoIndex]; // No es necesario restar 1 aquí
    }
    else {
        console.error("ID de evento no válido");
        return;
    }

    Swal.fire({
        title: `<span class="custom-title">${type_resta.titulo}</span>`,
        html: `
              <div class = "div-swal">
              <img src="${type_resta.imagen}" alt="imagen restaurante" class= "imagenRestaurante"/>
              <p class="text_swal">${type_resta.nosotros}</p>
              </div>
            `,
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',// Clase CSS para el borde del SweetAlert
            titlle: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}