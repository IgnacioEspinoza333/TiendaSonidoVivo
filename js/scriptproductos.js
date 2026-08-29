document.addEventListener('DOMContentLoaded', () => {

    const botonesFiltro = document.querySelectorAll('.filtro-boton');
    const tarjetas = document.querySelectorAll('.tarjeta-producto');
    const campoBusqueda = document.getElementById('buscador-input');
    const contador = document.getElementById('contador-resultados');
    const grid = document.getElementById('grid-productos');

    let categoriaActiva = 'todos';

    // Crea (una sola vez) el mensaje de "sin resultados"
    const mensajeVacio = document.createElement('div');
    mensajeVacio.className = 'sin-resultados';
    mensajeVacio.innerHTML = '<span>🔎</span><p>No encontramos productos que coincidan con tu búsqueda.</p>';
    mensajeVacio.style.display = 'none';
    if (grid) grid.appendChild(mensajeVacio);

    function aplicarFiltros() {
        const texto = campoBusqueda ? campoBusqueda.value.trim().toLowerCase() : '';
        let visibles = 0;

        tarjetas.forEach(tarjeta => {
            const categoria = tarjeta.dataset.categoria;
            const nombre = tarjeta.dataset.nombre.toLowerCase();

            const coincideCategoria = categoriaActiva === 'todos' || categoria === categoriaActiva;
            const coincideTexto = nombre.includes(texto);

            if (coincideCategoria && coincideTexto) {
                tarjeta.style.display = '';
                visibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        mensajeVacio.style.display = visibles === 0 ? 'block' : 'none';

        if (contador) {
            contador.textContent = visibles === 1
                ? '1 producto encontrado'
                : `${visibles} productos encontrados`;
        }
    }

    // Filtro por categoría
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            categoriaActiva = boton.dataset.categoria;
            aplicarFiltros();
        });
    });

    // Búsqueda por nombre en tiempo real
    if (campoBusqueda) {
        campoBusqueda.addEventListener('input', aplicarFiltros);
    }

    // Estado inicial
    aplicarFiltros();
});