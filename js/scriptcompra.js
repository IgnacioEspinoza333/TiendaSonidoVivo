/* =========================================
   1. LEER CARRITO Y CALCULAR TOTAL
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
    const contenedorResumen = document.getElementById('lista-resumen-productos');
    const elemTotal = document.getElementById('resumen-total');

    if (carrito.length === 0) {
        contenedorResumen.innerHTML = "<p>No hay productos en el carrito para pagar.</p>";
        elemTotal.innerText = "$0";
        return;
    }

    contenedorResumen.innerHTML = "";
    let totalGeneral = 0;

    carrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;
        totalGeneral += subtotal;

        const div = document.createElement('div');
        div.classList.add('producto-resumen');
        div.style.marginBottom = "1rem";
        div.style.display = "flex";
        div.style.gap = "15px";
        div.style.alignItems = "center";

        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" width="60" style="border-radius:4px;">
            <div>
                <h4 style="margin: 0; font-size: 0.95rem;">${prod.nombre}</h4>
                <p style="margin: 2px 0;">Cant: ${prod.cantidad} x $${prod.precio.toLocaleString('es-CL')}</p>
                <p class="precio-destacado" style="margin: 0; font-weight: bold;">$${subtotal.toLocaleString('es-CL')}</p>
            </div>
        `;
        contenedorResumen.appendChild(div);
    });

    elemTotal.innerText = '$' + totalGeneral.toLocaleString('es-CL');
});

/* =========================================
   2. VALIDACIONES DEL FORMULARIO
========================================= */
let formulario = document.getElementById("contacto");
let nombre = document.getElementById("nombre");
let rut = document.getElementById("rut");
let email = document.getElementById("email");
let fono = document.getElementById("fono");
let fenac = document.getElementById("fenac");

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

function marcarValido(campo, mensajeOk = "Correcto") {
    campo.classList.add("valido");
    campo.classList.remove("invalido");
    limpiarMensaje(campo);

    let ok = document.createElement("span");
    ok.classList.add("mensaje-ok");
    ok.textContent = "✅ " + mensajeOk;
    campo.insertAdjacentElement("afterend", ok);
}

/* =========================================
   3. EVENTO SUBMIT (PROCESAR COMPRA)
========================================= */
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    let esValido = true;

    // A. Validación Nombre
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
        marcarInvalido(nombre, "El nombre solo debe contener letras");
        esValido = false;
    } else {
        marcarValido(nombre, "Nombre válido");
    }

    // B. Validación RUT
    let rutLimpio = rut.value.replace(/\./g, "").toUpperCase();
    if (!/^\d{7,8}-[0-9K]$/.test(rutLimpio)) {
        marcarInvalido(rut, "Formato de RUT inválido (ej: 18123456-0)");
        esValido = false;
    } else {
        marcarValido(rut, "RUT válido");
    }

    // C. Validación Correo
    if (!/^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(email.value)) {
        marcarInvalido(email, "Correo debe ser gmail.com, outlook.com o duocuc.cl");
        esValido = false;
    } else {
        marcarValido(email, "Correo válido");
    }

    // D. Validación Teléfono
    if (!/^\+56\d{9}$/.test(fono.value)) {
        marcarInvalido(fono, "Formato: +56 seguido de 9 dígitos");
        esValido = false;
    } else {
        marcarValido(fono, "Teléfono válido");
    }

    // E. Validación Edad
    let hoy = new Date();
    let nacimiento = new Date(fenac.value);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    if (isNaN(edad) || edad < 18) {
        marcarInvalido(fenac, "Debes ser mayor de 18 años");
        esValido = false;
    } else {
        marcarValido(fenac, "Edad válida");
    }

    // F. Validación Forma de Pago
    let opcionesPago = document.querySelectorAll('input[name="fdepago"]:checked');
    if (opcionesPago.length === 0) {
        alert("Por favor, seleccione una forma de pago.");
        esValido = false;
    }

    // G. ACCIÓN FINAL
    if (esValido) {
        alert("¡Compra exitosa! Procesando pago...");

        const boton = document.getElementById('btn-submit');
        const mensajeExito = document.getElementById('mensaje-exito');

        boton.style.display = 'none';
        mensajeExito.style.display = 'block';

        // Vaciar el carrito tras el pago exitoso
        localStorage.removeItem('carritoSonidoVivo');

        formulario.reset();
        document.querySelectorAll(".valido, .invalido").forEach(c => c.classList.remove("valido", "invalido"));
        document.querySelectorAll(".mensaje-ok, .mensaje-error").forEach(m => m.remove());

        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }
});