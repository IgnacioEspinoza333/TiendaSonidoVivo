/* =========================================
   Interacciones JS - Detalle de Producto
========================================= */

// 1. GALERÍA DE IMÁGENES: Cambiar la imagen principal al hacer clic en las miniaturas (Lista por si agregas más fotos en el futuro)
function cambiarImagen(elementoMiniatura) {
    const imgPrincipal = document.getElementById('img-principal');
    imgPrincipal.src = elementoMiniatura.src;
    
    const miniaturas = document.querySelectorAll('.miniatura');
    miniaturas.forEach(min => min.classList.remove('activa'));
    
    elementoMiniatura.classList.add('activa');
}

// 2. CALCULADORA DE PRECIO: Multiplicar precio por cantidad en tiempo real
function calcularTotal() {
    const cantidad = document.getElementById('cantidad').value;
    const elementoPrecio = document.getElementById('precio-unitario');
    const precioBase = parseInt(elementoPrecio.getAttribute('data-precio'));
    
    const total = cantidad * precioBase;
    
    // Formateamos el número (ej: 349.990)
    const totalFormateado = '$' + total.toLocaleString('es-CL');
    document.getElementById('precio-total').innerText = totalFormateado;
}

// 3. PESTAÑAS DE INFORMACIÓN: Ocultar y mostrar contenido
function abrirPestaña(evento, idPestaña) {
    const contenidos = document.querySelectorAll('.contenido-pestaña');
    contenidos.forEach(contenido => contenido.classList.remove('activa'));
    
    const botones = document.querySelectorAll('.btn-pestaña');
    botones.forEach(boton => boton.classList.remove('activa'));
    
    document.getElementById(idPestaña).classList.add('activa');
    evento.currentTarget.classList.add('activa');
}

// 4. REDIRIGIR A WHATSAPP: Abre una nueva pestaña con un mensaje predeterminado
function mostrarMensaje() {
    const mensaje = document.getElementById('mensaje-confirmacion');
    mensaje.style.display = 'block'; // Mostramos el aviso
    
    // Obtenemos la cantidad seleccionada
    const cantidad = document.getElementById('cantidad').value;
    const nombreProducto = "Guitarra Eléctrica Stratocaster HSS";
    
    // Preparamos el número de teléfono (ejemplo genérico de Chile)
    const telefonoTienda = "56912345678"; 
    
    // Armamos el mensaje que le llegará a la tienda y lo codificamos para URL
    const textoMensaje = `Hola Sonido Vivo, me gustaría cotizar ${cantidad} unidad(es) de: ${nombreProducto}.`;
    const textoCodificado = encodeURIComponent(textoMensaje);
    
    // Creamos el link oficial de WhatsApp
    const linkWhatsApp = `https://wa.me/${telefonoTienda}?text=${textoCodificado}`;
    
    // Esperamos 1 segundo para que el usuario lea el aviso y abrimos WhatsApp
    setTimeout(() => {
        window.open(linkWhatsApp, '_blank'); // '_blank' hace que se abra en una pestaña nueva
        mensaje.style.display = 'none';      // Ocultamos el aviso en nuestra página
    }, 1000);
}

// 5. REDIRIGIR AL PAGO: Envía la cantidad seleccionada a compra.html
function irAlPago() {
    const cantidad = document.getElementById('cantidad').value;
    window.location.href = `compra.html?cant=${cantidad}`;
}