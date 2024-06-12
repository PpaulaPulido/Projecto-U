function verificacionContrasenas() {

    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmar_contrasena').value;


    if (contrasena !== confirmarContrasena) {
        Swal.fire({
            title: "Las contraseñas no coinciden",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            },
            customClass: {
                popup: 'border-blue',// Clase CSS para el borde del SweetAlert
                icon: 'success-icon',
            }
          });
        
        return false; // Detiene el envío del formulario
    } 
    return true; // Permite el envío del formulario si todo está correcto
}