/* ============================================================
   CATÁLOGO — Filtro por categoría y búsqueda por nombre
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const botonesFiltro = document.querySelectorAll('.filtro-boton');
    const tarjetas = document.querySelectorAll('.tarjeta-producto');
    const campoBusqueda = document.getElementById('buscador-input');
    const contador = document.getElementById('contador-resultados');
    const grid = document.getElementById('grid-productos');

    let categoriaActiva = 'todos';

    /* Mensaje de "sin resultados", creado una sola vez y reutilizado */
    const mensajeVacio = document.createElement('div');
    mensajeVacio.className = 'sin-resultados';
    mensajeVacio.innerHTML = '<span>🔎</span><p>No encontramos productos que coincidan con tu búsqueda.</p>';
    mensajeVacio.style.display = 'none';
    grid?.appendChild(mensajeVacio);

    function aplicarFiltros() {
        const texto = campoBusqueda?.value.trim().toLowerCase() ?? '';

        const visibles = [...tarjetas].filter((tarjeta) => {
            const coincideCategoria = categoriaActiva === 'todos' || tarjeta.dataset.categoria === categoriaActiva;
            const coincideTexto = tarjeta.dataset.nombre.toLowerCase().includes(texto);
            const seMuestra = coincideCategoria && coincideTexto;

            tarjeta.style.display = seMuestra ? '' : 'none';
            return seMuestra;
        }).length;

        mensajeVacio.style.display = visibles === 0 ? 'block' : 'none';

        if (contador) {
            contador.textContent = visibles === 1 ? '1 producto encontrado' : `${visibles} productos encontrados`;
        }
    }

    botonesFiltro.forEach((boton) => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach((b) => b.classList.remove('activo'));
            boton.classList.add('activo');
            categoriaActiva = boton.dataset.categoria;
            aplicarFiltros();
        });
    });

    campoBusqueda?.addEventListener('input', aplicarFiltros);

    aplicarFiltros(); // Estado inicial
});
