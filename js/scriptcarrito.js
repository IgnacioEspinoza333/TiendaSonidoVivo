/* ============================================================
   CARRITO DE COMPRAS — Renderizado y gestión de items
   ============================================================ */

const formatoCLP = (monto) => `$${monto.toLocaleString('es-CL')}`;
const leerCarrito = () => JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
const guardarCarrito = (carrito) => localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));

document.addEventListener('DOMContentLoaded', cargarCarrito);

function cargarCarrito() {
    const carrito = leerCarrito();
    const contenedor = document.getElementById('contenedor-carrito');
    const msgVacio = document.getElementById('carrito-vacio-msg');
    const tbody = document.getElementById('filas-carrito');

    if (carrito.length === 0) {
        if (contenedor) contenedor.style.display = 'none';
        if (msgVacio) msgVacio.style.display = 'block';
        return;
    }

    if (contenedor) contenedor.style.display = 'block';
    if (msgVacio) msgVacio.style.display = 'none';

    let totalGeneral = 0;

    tbody.innerHTML = carrito.map(({ imagen, nombre, precio, cantidad }, index) => {
        const subtotal = precio * cantidad;
        totalGeneral += subtotal;
        return `
            <tr>
                <td><img src="${imagen}" alt="${nombre}"></td>
                <td><strong>${nombre}</strong></td>
                <td>${formatoCLP(precio)}</td>
                <td>
                    <input type="number" min="1" max="10" value="${cantidad}"
                        style="width: 50px; text-align: center;"
                        onchange="actualizarCantidad(${index}, this.value)">
                </td>
                <td>${formatoCLP(subtotal)}</td>
                <td><button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>`;
    }).join('');

    document.getElementById('total-carrito').textContent = formatoCLP(totalGeneral);
}

function actualizarCantidad(index, nuevaCantidad) {
    const carrito = leerCarrito();
    const cantidad = parseInt(nuevaCantidad);

    if (cantidad > 0) {
        carrito[index].cantidad = cantidad;
        guardarCarrito(carrito);
        cargarCarrito();
    }
}

function eliminarProducto(index) {
    const carrito = leerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    cargarCarrito();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
        localStorage.removeItem('carritoSonidoVivo');
        cargarCarrito();
    }
}
