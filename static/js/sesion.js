function verificacionContrasenas(event) {
  event.preventDefault(); // Evita el envío del formulario inmediatamente

  const contrasena = document.getElementById('contrasena').value;
  const email = document.getElementById('usuario').value;
  const tipoRol = document.getElementById('rol').value;

  if (contrasena === '' || email === '' || tipoRol === '') {
    Swal.fire({
      title: "Todos los campos son obligatorios",
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
        popup: 'border-blue',
        icon: 'success-icon',
      }
    });

    return false; // Detiene el envío del formulario
  }

  return true;
}
function cerrarSesion(){
  document.addEventListener('click', ()=>{
    
  })
}