/* =========================================
   Validaciones de Inicio de Sesión
========================================= */

const formLogin = document.getElementById("form-login");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Limpia mensajes anteriores de validación
function limpiarMensaje(campo) {
    let siguiente = campo.nextElementSibling;
    if (siguiente && (siguiente.classList.contains("mensaje-error") || siguiente.classList.contains("mensaje-ok"))) {
        siguiente.remove();
    }
}

// Marca el campo como inválido con mensaje explicativo
function marcarInvalido(campo, mensaje) {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    limpiarMensaje(campo);

    let error = document.createElement("span");
    error.classList.add("mensaje-error");
    error.textContent = "❌ " + mensaje;
    campo.insertAdjacentElement("afterend", error);
}

// Marca el campo como válido
function marcarValido(campo) {
    campo.classList.add("valido");
    campo.classList.remove("invalido");
    limpiarMensaje(campo);
}

// Procesar inicio de sesión
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    let esValido = true;

    // 1. Validar Nombre de Usuario (mínimo 4 caracteres)
    if (!/^[a-zA-Z0-9_.-]{4,}$/.test(usuario.value.trim())) {
        marcarInvalido(usuario, "El usuario debe tener al menos 4 caracteres (sin espacios)");
        esValido = false;
    } else {
        marcarValido(usuario);
    }

    // 2. Validar Correo Electrónico
    if (!/^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl|hotmail\.com)$/i.test(email.value.trim())) {
        marcarInvalido(email, "Ingresa un correo válido (gmail, outlook, duocuc, hotmail)");
        esValido = false;
    } else {
        marcarValido(email);
    }

    // 3. Validar Contraseña (Mínimo 6 caracteres)
    if (password.value.trim().length < 6) {
        marcarInvalido(password, "La contraseña debe tener al menos 6 caracteres");
        esValido = false;
    } else {
        marcarValido(password);
    }

// 4. Acción si los datos son válidos
    if (esValido) {
        const btnLogin = document.getElementById("btn-login");
        const mensajeExito = document.getElementById("mensaje-login-exito");

        btnLogin.style.display = "none";
        mensajeExito.style.display = "block";

        // NUEVO: Guardamos el nombre de usuario en el navegador
        localStorage.setItem('usuarioActivo', usuario.value.trim());

        // Redirige al catálogo después de 2 segundos
        setTimeout(() => {
            window.location.href = "productos.html";
        }, 2000);
    }
});