document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioLocation');
    const btnRegresar = document.getElementById('btn_regresar');
    const redireccionar = document.getElementById('index').getAttribute('data-url');
    const redireccionarForm = document.getElementById('form_evento').getAttribute('data-url');


    alertaPu(formulario,redireccionar)
    regresarForm(btnRegresar,redireccionarForm)
   

});
