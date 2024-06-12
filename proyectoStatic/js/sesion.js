document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Captura los datos del formulario
  var correo = document.getElementById("usuario").value;
  var contrasena = document.getElementById("contrasena").value;

  // Guarda los datos en el almacenamiento local
  localStorage.setItem("correo", correo);
  localStorage.setItem("contrasena", contrasena);

  // Muestra un mensaje de éxito
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Has iniciado sesión correctamente",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
          popup: 'border-blue',// Clase CSS para el borde del SweetAlert
          icon: 'success-icon',
      }
  }).then(function () {
      localStorage.setItem('usuarioRegistrado', 'true');
      //window.location.href = '../templates/index_user.html?usuario=registrado';
  });
});