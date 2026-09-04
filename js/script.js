/* ============================================================
   COMPORTAMIENTOS GLOBALES DE UI
   Barra de progreso, menú móvil, tema claro/oscuro,
   animaciones al hacer scroll y botón "volver arriba".
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const barraProgreso = document.getElementById('barra-progreso');
    const botonArriba = document.getElementById('boton-arriba');
    const elementosRevelar = document.querySelectorAll('.revelar');

    /* Un único listener de scroll gestiona progreso, revelado y botón "arriba" */
    const alHacerScroll = () => {
        if (barraProgreso) {
            const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
            barraProgreso.style.width = `${(window.scrollY / alturaTotal) * 100}%`;
        }

        botonArriba?.classList.toggle('oculto', window.scrollY <= 300);

        const disparador = window.innerHeight * 0.85;
        elementosRevelar.forEach((el) => {
            if (el.getBoundingClientRect().top < disparador) el.classList.add('activo');
        });
    };

    window.addEventListener('scroll', alHacerScroll);
    alHacerScroll(); // Estado inicial

    /* Menú de navegación móvil */
    const botonMenu = document.getElementById('boton-menu');
    const menuPrincipal = document.getElementById('menu-principal');
    botonMenu?.addEventListener('click', () => {
        const abierto = menuPrincipal.classList.toggle('abierto');
        botonMenu.setAttribute('aria-expanded', abierto);
    });

    /* Conmutador de tema claro/oscuro */
    const botonTema = document.getElementById('boton-tema');
    const iconoTema = document.getElementById('icono-tema');
    botonTema?.addEventListener('click', () => {
        const activarClaro = document.body.getAttribute('data-tema') !== 'claro';
        activarClaro
            ? document.body.setAttribute('data-tema', 'claro')
            : document.body.removeAttribute('data-tema');
        iconoTema.textContent = activarClaro ? '☀' : '☾';
    });

    /* Botón "Volver arriba" */
    botonArriba?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
