document.addEventListener('DOMContentLoaded', () => {
    menu_lateralIndex();
    subirPublicacionEven();
    subirPublicacionEmprende();
    subirPublicacionRes();

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión con administrador:', error));

});


function subirPublicacionEven() {
    fetch('/publicacion/dashboard/evento')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(datos => {
            const containerEven = document.getElementById('pub_eventos');
            containerEven.innerHTML = "";

            if (datos.length == 0) {
                estadoVacio(containerEven, 'eventos', 'bi', 'bi-calendar-check');

            } else {
                estadoContenido(datos, containerEven, {
                    titulo: "Mis eventos",
                    idCampo : 'id',
                    nombreCampo: 'nombre',
                    tipoCampo: 'tipo',
                    imgAlt: 'logo del evento',
                    logo: 'logo'
                });
            }
        })
        .catch(error => {
            const containerEven = document.getElementById('pub_eventos');
            containerEven.innerHTML = "Error el cargar los registros de publicaciones eventos"
            console.log(error);

        })
}

function subirPublicacionEmprende() {
    fetch('/publicacion/dashboard/emprendimiento')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(datosEm => {
            const containerEm = document.getElementById('pub_emprende');
            containerEm.innerHTML = "";

            if (datosEm.length == 0) {
                estadoVacio(containerEm, 'restaurantes', 'fa-solid', 'fa-utensils');

            } else {
                estadoContenido(datosEm, containerEm, {
                    titulo: "Mis emprendimientos",
                    idCampo : 'id',
                    nombreCampo: 'nombre',
                    tipoCampo: 'tipo',
                    imgAlt: 'logo del emprendimiento',
                    logo: 'logo'
                });
            }
        })
        .catch(error => {
            const containerEm = document.getElementById('pub_emprende');
            containerEm.innerHTML = "Error el cargar los registros de publicaciones de emprendimientos"
            console.log(error);

        })
}

function subirPublicacionRes() {
    fetch('/publicacion/dashboard/restaurante')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(datos => {
            const containerRes = document.getElementById('pub_res');
            containerRes.innerHTML = "";

            if (datos.length == 0) {
                estadoVacio(containerRes, 'eventos', 'bi', 'bi-calendar-check');

            } else {
                estadoContenido(datos, containerRes, {
                    titulo: "Mis restaurantes",
                    idCampo : 'id',
                    nombreCampo: 'nombre',
                    tipoCampo: 'tipo',
                    imgAlt: 'logo del restaurante',
                    logo: 'logo'
                });
            }
        })
        .catch(error => {
            const containerEven = document.getElementById('pub_res');
            containerEven.innerHTML = "Error el cargar los registros de publicaciones de restaurantes"
            console.log(error);

        })
}


function estadoContenido(datos, container, config) {

    const divContainer = document.createElement("div");
    divContainer.classList.add('containerPub');

    const tituloE = document.createElement("h2");
    tituloE.textContent = config.titulo;
    tituloE.classList.add("tituloE");

    datos.forEach(publicacion => {

        const publicacionIndex = document.createElement("div");
        publicacionIndex.classList.add("publicacionIndex");
        publicacionIndex.setAttribute('data-id', publicacion[config.idCampo]);

        const tituloPub = document.createElement("h3");
        tituloPub.classList.add("publicacionTitle");
        tituloPub.textContent = publicacion[config.nombreCampo];

        const tipoEvent = document.createElement("p");
        tipoEvent.classList.add("publicacionTipoIndex");
        tipoEvent.textContent = publicacion[config.tipoCampo];

        const divImg = document.createElement("div");
        divImg.classList.add("divImgPub");

        const imgPub = document.createElement("img");
        imgPub.alt = config.imgAlt;
        imgPub.src = publicacion[config.logo];

        const divBotones = document.createElement('div');
        divBotones.classList.add("divBotonesPub");

        const botonV = document.createElement('a');
        botonV.classList.add("btnEdit", "botonesPub");
        botonV.id = `editar${publicacion[config.idCampo]}`;
        botonV.textContent = "Editar";

        const botonE = document.createElement('a');
        botonE.classList.add("btnEli", "botonesPub");
        botonE.textContent = "Eliminar";

        divBotones.appendChild(botonV);
        divBotones.appendChild(botonE);

        divImg.appendChild(imgPub);
        publicacionIndex.appendChild(tituloPub);
        publicacionIndex.appendChild(tipoEvent);
        publicacionIndex.appendChild(divImg);
        publicacionIndex.appendChild(divBotones)

        divContainer.appendChild(publicacionIndex);
        container.appendChild(tituloE);
        container.appendChild(divContainer);
    })
}

function estadoVacio(contenedor, message, icon1, icon2) {

    const div_vacío = document.createElement('div');
    div_vacío.classList.add('container_vac');

    const div_icon = document.createElement('div');
    div_icon.classList.add('div_icon');

    const icon = document.createElement('i');
    icon.classList.add(`${icon1}`, `${icon2}`, 'icon');

    const titulo = document.createElement('h2');
    titulo.textContent = `Aún no tienes publicaciones de ${message}`;

    div_icon.appendChild(icon);
    div_vacío.appendChild(div_icon);
    div_vacío.appendChild(titulo);
    contenedor.appendChild(div_vacío);

}
function menu_lateralIndex() {
    // sidebar toggle
    const btnToggle = document.querySelector('.toggle-btn');

    btnToggle.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('publicaciones').classList.toggle('active');

        const botonesA = document.querySelectorAll('.botonesPub');

        botonesA.forEach(boton =>{

            if(boton.classList.contains('active')){
                boton.classList.remove('active')
            }else{
                boton.classList.add('active');
            }
            
        })

    });
}