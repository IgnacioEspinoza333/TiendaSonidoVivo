/* ============================================================
   BASE DE DATOS DE PRODUCTOS (regla de negocio: sin cambios)
   ============================================================ */
const productosDB = {
    1: {
        id: 1,
        nombre: "Guitarra Eléctrica Stratocaster HSS",
        categoria: "Guitarras y Bajos",
        categoriaSlug: "Guitarras",
        precio: 349990,
        imagen: "img/guitarra1.jpg",
        descripcionCorta: "La configuración de pastillas HSS (Humbucker, Single, Single) ofrece una versatilidad inigualable, perfecta para pasar de limpios cristalinos a distorsiones potentes. Ideal para estilos desde el blues hasta el hard rock.",
        detalles: "Esta guitarra cuenta con un cuerpo de madera de tilo que proporciona un tono equilibrado. Su mástil de arce con perfil en \"C\" ofrece comodidad durante largas sesiones de práctica o presentaciones en vivo.",
        especificaciones: [
            "<strong>Cuerpo:</strong> Tilo macizo",
            "<strong>Mástil:</strong> Arce",
            "<strong>Diapasón:</strong> Palosanto, 22 trastes",
            "<strong>Cápsulas:</strong> 1 Humbucker, 2 Single-Coil",
            "<strong>Puente:</strong> Trémolo sincronizado vintage"
        ]
    },
    2: {
        id: 2,
        nombre: "Guitarra Acústica Dreadnought",
        categoria: "Guitarras y Bajos",
        categoriaSlug: "Guitarras",
        precio: 189990,
        imagen: "img/guitarras.jpg",
        descripcionCorta: "Tapa de abeto macizo y aros de caoba. Sonido cálido y proyección amplia.",
        detalles: "Construida con maderas seleccionadas para garantizar resonancia y durabilidad. Excelente respuesta acústica tanto para rasgueos potentes como para arpegios delicados.",
        especificaciones: [
            "<strong>Tapa:</strong> Abeto macizo",
            "<strong>Aros y Fondo:</strong> Caoba",
            "<strong>Mástil:</strong> Caoba",
            "<strong>Escala:</strong> 650 mm"
        ]
    },
    3: {
        id: 3,
        nombre: "Bajo Eléctrico Jazz Bass 4 Cuerdas",
        categoria: "Guitarras y Bajos",
        categoriaSlug: "Bajos",
        precio: 299990,
        imagen: "img/guitalle2.jfif",
        descripcionCorta: "Doble pastilla single coil, mástil delgado y gran versatilidad tonal.",
        detalles: "El clásico diseño Jazz Bass ofrece tonos definidos y un ataque rápido. Su perfil de mástil ergonómico permite un desplazamiento cómodo a lo largo de todo el diapasón.",
        especificaciones: [
            "<strong>Cuerpo:</strong> Aliso",
            "<strong>Cuerdas:</strong> 4",
            "<strong>Pastillas:</strong> 2 Single-Coil Jazz",
            "<strong>Controles:</strong> 2 Volumen, 1 Tono master"
        ]
    },
    4: {
        id: 4,
        nombre: "Piano Digital 88 Teclas Contrapesadas",
        categoria: "Teclados",
        categoriaSlug: "Teclados",
        precio: 459990,
        imagen: "img/teclados.jpg",
        descripcionCorta: "Acción de martillo realista, sonidos de piano de concierto y pedal de sustain.",
        detalles: "Ofrece la experiencia de tocar un piano acústico tradicional gracias a su teclado con acción de martillo graduado y su motor de sonido de alta fidelidad.",
        especificaciones: [
            "<strong>Teclas:</strong> 88 contrapesadas",
            "<strong>Polifonía:</strong> 128 voces",
            "<strong>Conectividad:</strong> USB-MIDI, Salida de Audífonos"
        ]
    },
    5: {
        id: 5,
        nombre: "Teclado Arranger 61 Teclas",
        categoria: "Teclados",
        categoriaSlug: "Teclados",
        precio: 259990,
        imagen: "img/piano1.jfif",
        descripcionCorta: "Cientos de voces y ritmos preprogramados, ideal para práctica y presentaciones.",
        detalles: "Perfecto para estudiantes y músicos itinerantes. Incluye altavoces integrados y una amplia variedad de acompañamientos automáticos.",
        especificaciones: [
            "<strong>Teclas:</strong> 61 sensibles a la velocidad",
            "<strong>Sonidos:</strong> +500 voces",
            "<strong>Pantalla:</strong> LCD retroiluminada"
        ]
    },
    6: {
        id: 6,
        nombre: "Controlador MIDI 49 Teclas",
        categoria: "Teclados",
        categoriaSlug: "Teclados",
        precio: 129990,
        imagen: "img/piano2.2.jfif",
        descripcionCorta: "Pads sensibles a la velocidad y knobs asignables, perfecto para producción musical.",
        detalles: "Integración fluida con los principales DAWs del mercado. Alimentado directamente por USB para facilitar el trabajo en estudio o movilidad.",
        especificaciones: [
            "<strong>Teclas:</strong> 49 sintetizador",
            "<strong>Pads:</strong> 8 retroiluminados",
            "<strong>Conexión:</strong> USB Plug & Play"
        ]
    },
    7: {
        id: 7,
        nombre: "Batería Acústica 5 Piezas",
        categoria: "Baterías",
        categoriaSlug: "Baterías",
        precio: 549990,
        imagen: "img/bateria1.jfif",
        descripcionCorta: "Set completo con platillos, herrajes y banco. Cáscaras de álamo para gran resonancia.",
        detalles: "Kit completo listo para armar y tocar. Incluye todos los atriles reforzados y los cuerpos estándar para cualquier estilo musical.",
        especificaciones: [
            "<strong>Cuerpos:</strong> Bombo 22\", Toms 10\" y 12\", Floor Tom 16\", Caja 14\"",
            "<strong>Material:</strong> Álamo 6 capas",
            "<strong>Incluye:</strong> Platillos Hi-Hat y Crash, Banco"
        ]
    },
    8: {
        id: 8,
        nombre: "Batería Electrónica Compacta",
        categoria: "Baterías",
        categoriaSlug: "Baterías",
        precio: 389990,
        imagen: "img/bateria2.jfif",
        descripcionCorta: "Módulo con más de 100 sonidos, ideal para práctica silenciosa con audífonos.",
        detalles: "Pads de malla de alta respuesta que simulan el rebote de un parche real, manteniendo un nivel de ruido acústico mínimo.",
        especificaciones: [
            "<strong>Pads:</strong> 4 Pads de malla, 3 Pads de platillo",
            "<strong>Módulo:</strong> 15 Kits de batería, metrónomo integrado",
            "<strong>Salidas:</strong> Audífonos, Aux In, MIDI"
        ]
    },
    9: {
        id: 9,
        nombre: "Set de Platillos 3 Piezas",
        categoria: "Baterías",
        categoriaSlug: "Baterías",
        precio: 99990,
        imagen: "img/platos.jfif",
        descripcionCorta: "Hi-hat, crash y ride en aleación de bronce B8 para un sonido brillante.",
        detalles: "Set de platillos de respuesta rápida y armónicos controlados. Ideal para actualizar tu set de batería inicial.",
        especificaciones: [
            "<strong>Aleación:</strong> Bronce B8",
            "<strong>Medidas:</strong> Hi-Hat 14\", Crash 16\", Ride 20\""
        ]
    },
    10: {
        id: 10,
        nombre: "Amplificador de Guitarra 40W",
        categoria: "Audio y Amplificación",
        categoriaSlug: "Audio",
        precio: 149990,
        imagen: "img/caja1.1.jfif",
        descripcionCorta: "Canales limpio y distorsión, reverb integrado y salida de auriculares.",
        detalles: "Potencia suficiente para ensayos de banda y escenarios pequeños. Ecualizador de 3 bandas para esculpir tu sonido a medida.",
        especificaciones: [
            "<strong>Potencia:</strong> 40 Watts RMS",
            "<strong>Altavoz:</strong> 10 pulgadas",
            "<strong>Efectos:</strong> Reverb analógico"
        ]
    },
    11: {
        id: 11,
        nombre: "Micrófono de Estudio Condensador",
        categoria: "Audio y Amplificación",
        categoriaSlug: "Audio",
        precio: 79990,
        imagen: "img/micro2.jfif",
        descripcionCorta: "Patrón cardioide, ideal para grabación vocal y de instrumentos acústicos.",
        detalles: "Respuesta en frecuencia plana con captura de detalles agudos muy limpia. Requiere alimentación Phantom Power +48V.",
        especificaciones: [
            "<strong>Tipo:</strong> Condensador de diafragma grande",
            "<strong>Patrón polar:</strong> Cardioide",
            "<strong>Respuesta:</strong> 20Hz - 20kHz"
        ]
    },
    12: {
        id: 12,
        nombre: "Pedal Multiefectos",
        categoria: "Audio y Amplificación",
        categoriaSlug: "Audio",
        precio: 119990,
        imagen: "img/pedal.jfif",
        descripcionCorta: "Más de 50 efectos, looper integrado y afinador cromático incorporado.",
        detalles: "Procesador digital de efectos compacto con capacidad de crear y guardar tus propios presintonías.",
        especificaciones: [
            "<strong>Efectos:</strong> 55 simulaciones de pedal y amp",
            "<strong>Looper:</strong> 30 segundos de grabación",
            "<strong>Alimentación:</strong> 9V DC o Baterías AA"
        ]
    }
};

let productoActual = null;

/* Setter de texto seguro: evita repetir el patrón getElementById + null-check */
const setTexto = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 1;
    productoActual = productosDB[id] || productosDB[1];

    document.title = `${productoActual.nombre} · Sonido Vivo`;

    const imgPrincipal = document.getElementById('img-principal');
    if (imgPrincipal) {
        imgPrincipal.src = productoActual.imagen;
        imgPrincipal.alt = productoActual.nombre;
    }

    setTexto('migas-categoria', productoActual.categoriaSlug);
    setTexto('migas-nombre', productoActual.nombre);
    setTexto('categoria-etiqueta', productoActual.categoria);
    setTexto('titulo-producto', productoActual.nombre);
    setTexto('descripcion-corta', productoActual.descripcionCorta);
    setTexto('detalles-texto', productoActual.detalles);

    const elementoPrecio = document.getElementById('precio-unitario');
    if (elementoPrecio) {
        elementoPrecio.setAttribute('data-precio', productoActual.precio);
        elementoPrecio.textContent = `$${productoActual.precio.toLocaleString('es-CL')}`;
    }

    const listaEspec = document.getElementById('lista-especificaciones');
    if (listaEspec) {
        listaEspec.innerHTML = productoActual.especificaciones.map((spec) => `<li>${spec}</li>`).join('');
    }

    calcularTotal();
});

/* Calculadora de precio total según la cantidad seleccionada */
function calcularTotal() {
    const cantidadInput = document.getElementById('cantidad');
    if (!cantidadInput || !productoActual) return;

    const cantidad = parseInt(cantidadInput.value) || 1;
    const precioTotalElem = document.getElementById('precio-total');
    if (precioTotalElem) {
        precioTotalElem.textContent = `$${(cantidad * productoActual.precio).toLocaleString('es-CL')}`;
    }
}

/* Agrega (o suma cantidad a) el producto actual en el carrito guardado */
function agregarAlCarrito() {
    const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
    const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
    const itemExistente = carrito.find((item) => item.id === productoActual.id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        const { id, nombre, precio, imagen } = productoActual;
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }

    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    alert(`¡Se agregaron ${cantidad} unidad(es) de "${productoActual.nombre}" al carrito!`);
}

/* Añade al carrito y redirige directo al carrito de compras */
function irAlPago() {
    agregarAlCarrito();
    window.location.href = 'detalle_carrito.html';
}

/* Control de pestañas de Descripción / Especificaciones */
function abrirPestaña(evento, idPestaña) {
    document.querySelectorAll('.contenido-pestaña, .btn-pestaña').forEach((el) => el.classList.remove('activa'));
    document.getElementById(idPestaña)?.classList.add('activa');
    evento.currentTarget.classList.add('activa');
}

/* Genera el enlace de cotización por WhatsApp y lo abre */
function mostrarMensaje() {
    const mensaje = document.getElementById('mensaje-confirmacion');
    if (mensaje) mensaje.style.display = 'block';

    const cantidad = document.getElementById('cantidad').value;
    const telefonoTienda = '56912345678';
    const texto = encodeURIComponent(
        `Hola Sonido Vivo, me gustaría cotizar ${cantidad} unidad(es) de: ${productoActual.nombre}.`
    );

    setTimeout(() => {
        window.open(`https://wa.me/${telefonoTienda}?text=${texto}`, '_blank');
        if (mensaje) mensaje.style.display = 'none';
    }, 1000);
}
