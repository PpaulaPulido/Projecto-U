import { user_sesion } from './navegacion_user.js';
import { no_user} from './navegacion.js';
//comentario
// Función para mostrar la barra de navegación para usuarios registrados
function mostrarBarraUsuarioRegistrado() {
    
    user_sesion();
}

// Función para mostrar la barra de navegación para usuarios no registrados
function mostrarBarraNoRegistrado() {
    no_user();
}

// Función para redirigir al usuario según su estado de sesión
function redireccionarUsuario() {

    // Verificar si el usuario está registrado en localStorage
    var usuarioRegistrado = localStorage.getItem('usuarioRegistrado') === 'true';
    var nuevaURL;
    // Mostrar la barra de navegación según el estado de sesión
    if (usuarioRegistrado) {
        nuevaURL = window.location.href + (window.location.search ? '&' : '?') + 'usuario=registrado';
        mostrarBarraUsuarioRegistrado();
    } else {
        mostrarBarraNoRegistrado();
    }
}

// Llamar a la función de redirección al cargar la página
redireccionarUsuario();
