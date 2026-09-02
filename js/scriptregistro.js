/* =========================================
   Validaciones de Registro de Usuario
========================================= */

const formRegistro = document.getElementById("form-registro");
const nombre = document.getElementById("nombre");
const rut = document.getElementById("rut");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmar-password");
const terminos = document.getElementById("terminos");

// Funciones auxiliares para mostrar/ocultar errores
function limpiarMensaje(campo) {
    let siguiente = campo.nextElementSibling;
    if (siguiente && (siguiente.classList.contains("mensaje-error") || siguiente.classList.contains("mensaje-ok"))) {
        siguiente.remove();
    }
}

function marcarInvalido(campo, mensaje) {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    limpiarMensaje(campo);

    let error = document.createElement("span");
    error.classList.add("mensaje-error");
    error.textContent = "❌ " + mensaje;
    campo.insertAdjacentElement("afterend", error);
}

function marcarValido(campo) {
    campo.classList.add("valido");
    campo.classList.remove("invalido");
    limpiarMensaje(campo);
}

// Procesar el formulario
formRegistro.addEventListener("submit", function (event) {
    event.preventDefault();
    let esValido = true;

    // 1. Validar Nombre Completo (Solo letras y espacios, mín 3 caracteres)
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre.value.trim())) {
        marcarInvalido(nombre, "Ingresa un nombre válido (solo letras)");
        esValido = false;
    } else {
        marcarValido(nombre);
    }

    // 2. Validar RUT (Formato simple: números, guion, número o K)
    if (!/^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut.value.trim())) {
        marcarInvalido(rut, "Formato incorrecto. Ej: 12345678-9");
        esValido = false;
    } else {
        marcarValido(rut);
    }

    // 3. Validar Nombre de Usuario (Mín 4 caracteres, sin espacios)
    if (!/^[a-zA-Z0-9_.-]{4,}$/.test(usuario.value.trim())) {
        marcarInvalido(usuario, "Mínimo 4 caracteres (sin espacios)");
        esValido = false;
    } else {
        marcarValido(usuario);
    }

    // 4. Validar Correo
    if (!/^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl|hotmail\.com)$/i.test(email.value.trim())) {
        marcarInvalido(email, "Correo no permitido (solo gmail, outlook, duocuc, hotmail)");
        esValido = false;
    } else {
        marcarValido(email);
    }

    // 5. Validar Contraseña (Mínimo 6 caracteres)
    if (password.value.trim().length < 6) {
        marcarInvalido(password, "Mínimo 6 caracteres");
        esValido = false;
    } else {
        marcarValido(password);
    }

    // 6. Validar Confirmación de Contraseña
    if (confirmarPassword.value.trim() !== password.value.trim() || confirmarPassword.value.trim() === "") {
        marcarInvalido(confirmarPassword, "Las contraseñas no coinciden");
        esValido = false;
    } else {
        marcarValido(confirmarPassword);
    }

    // 7. Validar Checkbox Términos
    if (!terminos.checked) {
        alert("Debes aceptar los Términos y Condiciones para registrarte.");
        esValido = false;
    }

    // Acción si todo está correcto
    if (esValido) {
        const btnRegistro = document.getElementById("btn-registro");
        const mensajeExito = document.getElementById("mensaje-registro-exito");

        btnRegistro.style.display = "none";
        mensajeExito.style.display = "block";

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2500);
    }
});