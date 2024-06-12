let bars_search = document.getElementById("ctn-bars-search");
let cover_ctn_search = document.getElementById("cover-ctn-search");
let inputSearch = document.getElementById("inputSearch");
let box_search = document.getElementById("box-search");

document.addEventListener('DOMContentLoaded', function () {

    // Obtener el elemento ul
    let ulElement = document.getElementById("box-search");

    // Datos para la lista de busqueda
    const listaDatos = [
        "Próximos eventos",
        "Restaurantes",
        "Comida Rápida",
        "Emprendimientos",
        "Eventos",
        "Negocios de ropa",
        "Tienda de artesania"
    ];


    // Iterar sobre los datos y crear elementos li y a
    listaDatos.forEach(function (item) {
        // Crear elementos li y a
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");

        if (item === 'Restaurantes') {
            aElement.href = "./seccion_res.html";
        } else if (item === 'Eventos') {
            aElement.href = "./seccion_Evento.html";
        }

        // Configurar el texto del elemento a con el dato actual
        aElement.textContent = item;

        // Agregar el icono
        let icono = document.createElement("i");
        icono.className = "fas fa-search";
        aElement.prepend(icono);

        // Agregar el elemento a al elemento li
        liElement.appendChild(aElement);

        // Agregar el elemento li al elemento ul
        ulElement.appendChild(liElement);
    });


    document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
    document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);


    //Funcion para mostrar el buscador
    function mostrar_buscador() {

        bars_search.style.top = "80px";
        cover_ctn_search.style.display = "block";
        inputSearch.focus();//importante para cuando deben escribir en el buscador

        if (inputSearch.value === "") {
            box_search.style.display = "none";
        }

    }

    //Funcion para ocultar el buscador
    function ocultar_buscador() {

        bars_search.style.top = "-10px";
        cover_ctn_search.style.display = "none";
        inputSearch.value = "";
        box_search.style.display = "none";

    }


    // filtrado de busqueda

    // Selecciona el elemento de HTML con el id "inputSearch" y agrega un evento "keyup" que llama a la función buscador_interno
    document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

    // Definición de la función buscador_interno
    function buscador_interno() {

        // Obtiene el valor del campo de entrada y lo convierte a mayúsculas para hacer la comparación de manera insensible a mayúsculas y minúsculas
        filter = inputSearch.value.toUpperCase();

        // Obtiene todos los elementos <li> dentro del elemento con el id "box_search"
        li = box_search.getElementsByTagName("li");

        // Recorre todos los elementos <li> obtenidos
        for (i = 0; i < li.length; i++) {

            // Obtiene el primer elemento <a> dentro del elemento <li> actual
            a = li[i].getElementsByTagName("a")[0];

            // Obtiene el texto del elemento <a> o un texto alternativo si no está disponible
            textValue = a.textContent || a.innerText;

            // Comprueba si el texto dentro del elemento <a> contiene la cadena de búsqueda
            if (textValue.toUpperCase().indexOf(filter) > -1) {

                // Si la cadena de búsqueda está presente, muestra el elemento <li> y el contenedor de búsqueda
                li[i].style.display = "";
                box_search.style.display = "block";

                // Si el campo de entrada está vacío, oculta el contenedor de búsqueda
                if (inputSearch.value === "") {
                    box_search.style.display = "none";
                }

            } else {
                // Si la cadena de búsqueda no está presente, oculta el elemento <li>
                li[i].style.display = "none";
            }
        }
    }

})