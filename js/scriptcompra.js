/* =========================================
   1. LEER URL Y CALCULAR TOTAL
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Extraemos la cantidad de la URL (ej: compra.html?cant=3)
    const parametros = new URLSearchParams(window.location.search);
    let cantidad = parametros.get('cant');
    
    // Si entran directo sin pasar por el producto, asume 1
    if (!cantidad) cantidad = 1;
    
    const precioUnitario = 349990;
    const total = cantidad * precioUnitario;
    
    // Mostramos en pantalla
    document.getElementById('resumen-cantidad').innerText = cantidad;
    document.getElementById('resumen-total').innerText = '$' + total.toLocaleString('es-CL');
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

// Función auxiliar para borrar mensajes viejos
function limpiarMensaje(campo) {
    let siguiente = campo.nextElementSibling;
    if (siguiente && (siguiente.classList.contains("mensaje-error") || siguiente.classList.contains("mensaje-ok"))) {
        siguiente.remove();
    }
}

// Función para marcar campo con error
function marcarInvalido(campo, mensaje) {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    limpiarMensaje(campo);

    let error = document.createElement("span");
    error.classList.add("mensaje-error");
    error.textContent = "❌ " + mensaje;
    campo.insertAdjacentElement("afterend", error);
}

// Función para marcar campo correcto
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
    event.preventDefault(); // Evita que la página se recargue
    let esValido = true;

    // A. Validación Nombre (Solo letras y espacios)
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
        marcarInvalido(nombre, "El nombre solo debe contener letras");
        esValido = false;
    } else {
        marcarValido(nombre, "Nombre válido");
    }

    // B. Validación RUT (formato chileno sin puntos)
    let rutLimpio = rut.value.replace(/\./g, "").toUpperCase();
    if (!/^\d{7,8}-[0-9K]$/.test(rutLimpio)) {
        marcarInvalido(rut, "Formato de RUT inválido (ej: 18123456-0)");
        esValido = false;
    } else {
        marcarValido(rut, "RUT válido");
    }

    // C. Validación Correo (Solo dominios permitidos)
    if (!/^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(email.value)) {
        marcarInvalido(email, "Correo debe ser gmail.com, outlook.com o duocuc.cl");
        esValido = false;
    } else {
        marcarValido(email, "Correo válido");
    }

    // D. Validación Teléfono (Formato +569...)
    if (!/^\+56\d{9}$/.test(fono.value)) {
        marcarInvalido(fono, "Formato: +56 seguido de 9 dígitos");
        esValido = false;
    } else {
        marcarValido(fono, "Teléfono válido");
    }

    // E. Validación Edad (Mayor de 18 años)
    let hoy = new Date();
    let nacimiento = new Date(fenac.value);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    
    // Ajuste si aún no ha pasado el mes de cumpleaños en el año actual
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

    // G. ACCIÓN FINAL SI TODO ESTÁ CORRECTO
    if (esValido) {
        // Alerta nativa
        alert("¡Compra exitosa! Procesando pago...");
        
        // Cambiar botones visualmente
        const boton = document.getElementById('btn-submit');
        const mensajeExito = document.getElementById('mensaje-exito');
        
        boton.style.display = 'none';
        mensajeExito.style.display = 'block';
        
        // Limpiar el formulario y los mensajes de validación
        formulario.reset();
        document.querySelectorAll(".valido, .invalido").forEach(c => c.classList.remove("valido", "invalido"));
        document.querySelectorAll(".mensaje-ok, .mensaje-error").forEach(m => m.remove());

        // Redirigir a la página principal después de 3 segundos
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }
});