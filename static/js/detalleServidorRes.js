document.addEventListener('DOMContentLoaded', () => {
    generarDatos();
    calificacion();
});
function calificacion() {
    const rating = document.getElementById('rating');
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add("bi", "bi-star-fill", "star");
        rating.appendChild(star);
    }
}
function generarDatos(callback) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`/res/restauranteDetalleJson/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            console.log(data); // Ver los datos obtenidos en la consola
            mostrarDatos(data);
            galeria('publicacion/galeriaImagenes/restaurante');

            if (callback) {
                callback(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarDatos(data) {
    document.getElementById('title').textContent = data.nombreresta;
    document.getElementById('nombreRes').textContent = data.nombreresta;
    document.querySelector('#contacto').textContent = data.telresta;
    document.querySelector('#comidas').textContent = data.tiporesta;
    document.querySelector('#correo').textContent = data.correoresta || 'No aplica';
    let datoAdminSelector = document.querySelector('#nombreAdmin');
    let datosAdmin = (data.administrador) ? `Publicado por ${data.administrador + data.apellidoAdm}` : '';
    datoAdminSelector.innerHTML = datosAdmin;

    const divhorario = document.createElement('div');
    divhorario.classList.add('horarioRes');
    const texto = document.createElement('p');
    texto.textContent = data.horario;
    const horaTexto = document.createElement('p');
    horaTexto.textContent = `Hora de apertura: ${data.horarioApertura} / Hora de cierre: ${data.horarioCierre}`;
    divhorario.appendChild(texto);
    divhorario.appendChild(horaTexto);


    const horario = document.querySelector('#horario')
    horario.appendChild(divhorario);

    const sitio_web = document.querySelector('#web');
    sitio_web.href = data.paginaresta;
    sitio_web.target = '_blank';

    const redes = data.redes_sociales ? data.redes_sociales.split('; ') : [];
    const enlace = document.querySelector('#red1');
    if (redes[0]) {
        enlace.href = redes[0].split(': ')[1];
        enlace.target = "_blank";
    } else {
        enlace.style.display = 'none';
    }

    const enlace2 = document.querySelector('#red2');
    if (redes[1]) {
        enlace2.href = redes[1].split(': ')[1];
        enlace2.target = "_blank";
    } else {
        enlace2.style.display = 'none';
    }

    const location_lista = document.getElementById("location");
    const ubicaciones = data.ubicaciones_restaurante ? data.ubicaciones_restaurante.split('; ') : [];
    ubicaciones.forEach(ubicacion => {
        const nuevaLi = document.createElement("li");
        nuevaLi.textContent = ubicacion;
        location_lista.appendChild(nuevaLi);
    });
}

function popup_nosotros() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`/res/restauranteDetalleJson/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            popupNosotros(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function popupNosotros(data) {
    Swal.fire({
        title: `<span class="custom-title">${data.nombreresta}</span>`,
        html: `
              <div class="div-swal">
              <img src="${data.logo}" alt="imagen restaurante" class="imagenPublicacion"/>
              <p class="text_swal">${data.descripresta}</p>
              </div>
            `,
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',
            title: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}
function popup_menu() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`/res/restauranteDetalleJson/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            popupmenu(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function popupmenu(data) {

    let menuHtml = '<h3>Nuestro Menú</h3>';
    menuHtml += `<p class="screen"> 🍽️<a href="${data.menu}" target="_blank">Ver Nuestro Menú</a></p>`;

    Swal.fire({
        title: `<span class="custom-title">${data.nombreresta}</span>`,
        html: `<div class="div-swal">${menuHtml}</div>`,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',
            title: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}
