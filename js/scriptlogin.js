/* ============================================================
   INICIO DE SESIÓN — Validación del formulario
   ============================================================ */

const formLogin = document.getElementById('form-login');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password = document.getElementById('password');

const limpiarMensaje = (campo) => {
    const siguiente = campo.nextElementSibling;
    if (siguiente?.classList.contains('mensaje-error') || siguiente?.classList.contains('mensaje-ok')) {
        siguiente.remove();
    }
};

/* Marca el campo como válido/inválido; el mensaje solo se muestra en caso de error */
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

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const reglas = [
        {
            campo: usuario,
            valido: /^[a-zA-Z0-9_.-]{4,}$/.test(usuario.value.trim()),
            error: 'El usuario debe tener al menos 4 caracteres (sin espacios)',
        },
        {
            campo: email,
            valido: /^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl|hotmail\.com)$/i.test(email.value.trim()),
            error: 'Ingresa un correo válido (gmail, outlook, duocuc, hotmail)',
        },
        {
            campo: password,
            valido: password.value.trim().length >= 6,
            error: 'La contraseña debe tener al menos 6 caracteres',
        },
    ];

    const esValido = reglas.every(({ campo, valido, error }) => {
        marcarCampo(campo, valido, error);
        return valido;
    });

    if (!esValido) return;

    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('mensaje-login-exito').style.display = 'block';

    localStorage.setItem('usuarioActivo', usuario.value.trim());

    setTimeout(() => window.location.href = 'productos.html', 2000);
});
