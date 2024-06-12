document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();
    estadoPublicaciones();
    
});

user_sesion();
function estadoPublicaciones() {

    const pubEventos = document.getElementById('pub_eventos');
    const pubRes = document.getElementById('pub_res');
    const pubEmprende = document.getElementById('pub_emprende');

    estadoVacio(pubEventos,'eventos','bi','bi-calendar-check');
    estadoVacio(pubRes,'restaurantes','fa-solid','fa-utensils');
    estadoVacio(pubEmprende,'emprendimientos','fa-solid','fa-building');
}
function estadoVacio(contenedor, message,icon1,icon2) {

    const div_vacío = document.createElement('div');
    div_vacío.classList.add('container_vac');

    const div_icon = document.createElement('div');
    div_icon.classList.add('div_icon');

    const icon = document.createElement('i');
    icon.classList.add(`${icon1}`, `${icon2}`,'icon');

    const titulo = document.createElement('h2');
    titulo.textContent = `Aún no tienes publicaciones de ${message}`;

    div_icon.appendChild(icon);
    div_vacío.appendChild(div_icon);
    div_vacío.appendChild(titulo);
    contenedor.appendChild(div_vacío);

}