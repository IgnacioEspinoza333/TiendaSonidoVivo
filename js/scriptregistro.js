/* ============================================================
   REGISTRO DE USUARIO — Validación del formulario
   ============================================================ */

const formRegistro = document.getElementById('form-registro');
const nombre = document.getElementById('nombre');
const rut = document.getElementById('rut');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmarPassword = document.getElementById('confirmar-password');
const terminos = document.getElementById('terminos');

const limpiarMensaje = (campo) => {
    const siguiente = campo.nextElementSibling;
    if (siguiente?.classList.contains('mensaje-error') || siguiente?.classList.contains('mensaje-ok')) {
        siguiente.remove();
    }
};

const marcarCampo = (campo, esValido, mensajeError) => {
    campo.classList.toggle('valido', esValido);
    campo.classList.toggle('invalido', !esValido);
    limpiarMensaje(campo);

    if (!esValido) {
        const error = document.createElement('span');
        error.className = 'mensaje-error';
        error.textContent = `❌ ${mensajeError}`;
        campo.insertAdjacentElement('afterend', error);
    }
};

formRegistro.addEventListener('submit', (event) => {
    event.preventDefault();

    const reglas = [
        {
            campo: nombre,
            valido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre.value.trim()),
            error: 'Ingresa un nombre válido (solo letras)',
        },
        {
            campo: rut,
            valido: /^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut.value.trim()),
            error: 'Formato incorrecto. Ej: 12345678-9',
        },
        {
            campo: usuario,
            valido: /^[a-zA-Z0-9_.-]{4,}$/.test(usuario.value.trim()),
            error: 'Mínimo 4 caracteres (sin espacios)',
        },
        {
            campo: email,
            valido: /^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl|hotmail\.com)$/i.test(email.value.trim()),
            error: 'Correo no permitido (solo gmail, outlook, duocuc, hotmail)',
        },
        {
            campo: password,
            valido: password.value.trim().length >= 6,
            error: 'Mínimo 6 caracteres',
        },
        {
            campo: confirmarPassword,
            valido: confirmarPassword.value.trim() !== '' && confirmarPassword.value.trim() === password.value.trim(),
            error: 'Las contraseñas no coinciden',
        },
    ];

    let esValido = reglas.every(({ campo, valido, error }) => {
        marcarCampo(campo, valido, error);
        return valido;
    });

    if (!terminos.checked) {
        alert('Debes aceptar los Términos y Condiciones para registrarte.');
        esValido = false;
    }

    if (!esValido) return;

    document.getElementById('btn-registro').style.display = 'none';
    document.getElementById('mensaje-registro-exito').style.display = 'block';

    setTimeout(() => window.location.href = 'login.html', 2500);
});
