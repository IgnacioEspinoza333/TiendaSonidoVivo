/* ============================================================
   CHECKOUT — Resumen de compra + Validación del formulario
   ============================================================ */

const formatoCLP = (monto) => `$${monto.toLocaleString('es-CL')}`;

/* --- Helpers de feedback visual reutilizables --- */
const limpiarMensaje = (campo) => {
    const siguiente = campo.nextElementSibling;
    if (siguiente?.classList.contains('mensaje-error') || siguiente?.classList.contains('mensaje-ok')) {
        siguiente.remove();
    }
};

const marcarCampo = (campo, esValido, mensaje) => {
    campo.classList.toggle('valido', esValido);
    campo.classList.toggle('invalido', !esValido);
    limpiarMensaje(campo);

    const span = document.createElement('span');
    span.className = esValido ? 'mensaje-ok' : 'mensaje-error';
    span.textContent = `${esValido ? '✅' : '❌'} ${mensaje}`;
    campo.insertAdjacentElement('afterend', span);
};

/* --- Renderiza el resumen de compra a partir del carrito guardado --- */
function renderizarResumen() {
    const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
    const contenedor = document.getElementById('lista-resumen-productos');
    const elemTotal = document.getElementById('resumen-total');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito para pagar.</p>';
        elemTotal.textContent = '$0';
        return;
    }

    let totalGeneral = 0;

    contenedor.innerHTML = carrito.map(({ imagen, nombre, precio, cantidad }) => {
        const subtotal = precio * cantidad;
        totalGeneral += subtotal;
        return `
            <div class="producto-resumen" style="margin-bottom:1rem;display:flex;gap:15px;align-items:center;">
                <img src="${imagen}" alt="${nombre}" width="60" style="border-radius:4px;">
                <div>
                    <h4 style="margin:0;font-size:0.95rem;">${nombre}</h4>
                    <p style="margin:2px 0;">Cant: ${cantidad} x ${formatoCLP(precio)}</p>
                    <p class="precio-destacado" style="margin:0;font-weight:bold;">${formatoCLP(subtotal)}</p>
                </div>
            </div>`;
    }).join('');

    elemTotal.textContent = formatoCLP(totalGeneral);
}

/* --- Cálculo de edad a partir de la fecha de nacimiento --- */
const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarResumen();

    const formulario = document.getElementById('contacto');
    const campos = {
        nombre: document.getElementById('nombre'),
        rut: document.getElementById('rut'),
        email: document.getElementById('email'),
        fono: document.getElementById('fono'),
        fenac: document.getElementById('fenac'),
    };

    /* Reglas de validación: cada una sabe evaluarse y describir su error */
    const reglas = [
        {
            campo: campos.nombre,
            valido: () => /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(campos.nombre.value),
            msgOk: 'Nombre válido',
            msgError: 'El nombre solo debe contener letras',
        },
        {
            campo: campos.rut,
            valido: () => /^\d{7,8}-[0-9K]$/.test(campos.rut.value.replace(/\./g, '').toUpperCase()),
            msgOk: 'RUT válido',
            msgError: 'Formato de RUT inválido (ej: 12345678-9)',
        },
        {
            campo: campos.email,
            valido: () => /^[\w.+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(campos.email.value),
            msgOk: 'Correo válido',
            msgError: 'Correo debe ser gmail.com, outlook.com o duocuc.cl',
        },
        {
            campo: campos.fono,
            valido: () => /^\+56\d{9}$/.test(campos.fono.value),
            msgOk: 'Teléfono válido',
            msgError: 'Formato: +56 seguido de 9 dígitos',
        },
        {
            campo: campos.fenac,
            valido: () => calcularEdad(campos.fenac.value) >= 18,
            msgOk: 'Edad válida',
            msgError: 'Debes ser mayor de 18 años',
        },
    ];

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const camposValidos = reglas.reduce((acumulado, { campo, valido, msgOk, msgError }) => {
            const ok = valido();
            marcarCampo(campo, ok, ok ? msgOk : msgError);
            return acumulado && ok;
        }, true);

        const pagoSeleccionado = document.querySelector('input[name="fdepago"]:checked');
        if (!pagoSeleccionado) alert('Por favor, seleccione una forma de pago.');

        if (!camposValidos || !pagoSeleccionado) return;

        alert('¡Compra exitosa! Procesando pago...');

        document.getElementById('btn-submit').style.display = 'none';
        document.getElementById('mensaje-exito').style.display = 'block';

        localStorage.removeItem('carritoSonidoVivo');
        formulario.reset();
        document.querySelectorAll('.valido, .invalido').forEach(c => c.classList.remove('valido', 'invalido'));
        document.querySelectorAll('.mensaje-ok, .mensaje-error').forEach(m => m.remove());

        setTimeout(() => window.location.href = 'index.html', 3000);
    });
});
