document.addEventListener('DOMContentLoaded', cargarCarrito);

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
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

    tbody.innerHTML = '';
    let totalGeneral = 0;

    carrito.forEach((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        totalGeneral += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${prod.imagen}" alt="${prod.nombre}"></td>
            <td><strong>${prod.nombre}</strong></td>
            <td>$${prod.precio.toLocaleString('es-CL')}</td>
            <td>
                <input type="number" min="1" max="10" value="${prod.cantidad}" 
                    style="width: 50px; text-align: center;" 
                    onchange="actualizarCantidad(${index}, this.value)">
            </td>
            <td>$${subtotal.toLocaleString('es-CL')}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    document.getElementById('total-carrito').innerText = '$' + totalGeneral.toLocaleString('es-CL');
}

function actualizarCantidad(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
    const cantidad = parseInt(nuevaCantidad);

    if (cantidad > 0) {
        carrito[index].cantidad = cantidad;
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
        cargarCarrito();
    }
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    cargarCarrito();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
        localStorage.removeItem('carritoSonidoVivo');
        cargarCarrito();
    }
}