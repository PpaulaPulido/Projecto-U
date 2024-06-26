document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los favoritos del usuario al cargar la página
    fetch('/usuarios/obtener_favoritos/usuario')
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

    // Manejar el clic en los íconos de favoritos
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('favorite')) {
            const iconHeart = event.target;
            const entityId = iconHeart.dataset.id;
            const entityType = iconHeart.dataset.type;

            if (iconHeart.classList.contains('active')) {
                // Eliminar de favoritos
                fetch('/usuarios/remover_favorito/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({ id: entityId, tipo: entityType })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        iconHeart.classList.remove('active');
                        iconHeart.style.color = '#cecbcb';
                    } else {
                        console.error('Error en la respuesta del servidor:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud fetch:', error);
                    
                });

            } else {
                // Agregar a favoritos
                fetch('/usuarios/agregar_favorito/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({ id: entityId, tipo: entityType })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        iconHeart.classList.add('active');
                        iconHeart.style.color = 'red';
                    } else {
                        console.error('Error en la respuesta del servidor:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud fetch:', error);
                    alert('Error al intentar agregar el favorito.');
                });
            }
        }
    });
});

function limpiarSesionFavoritos() {
    fetch('/usuarios/limpiar_sesion_favoritos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Sesión de favoritos limpiada');
            // Aquí puedes actualizar la UI si es necesario
        } else {
            console.error('Error al limpiar la sesión de favoritos:', data.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });
}
