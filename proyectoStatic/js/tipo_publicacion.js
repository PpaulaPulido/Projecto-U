function publicacion(cardNumber) {
    switch(cardNumber) {
        case 1:
            window.location.href = '/templates/formularioeventos.html'; 
            break;
        case 2:
            window.location.href = '#'; 
            break;
        case 3:
            window.location.href = '/templates/publicacionRes.html'; 
            break;
        default:
            console.log("Tarjeta no reconocida");
            break;
    }
}
