document.addEventListener('DOMContentLoaded', () => {

    // 1. Barra de progreso de Scroll
    const barraProgreso = document.getElementById('barra-progreso');
    window.addEventListener('scroll', () => {
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = (window.scrollY / alturaTotal) * 100;
        if (barraProgreso) {
            barraProgreso.style.width = `${progreso}%`;
        }
    });

    // 2. Menú de navegación móvil
    const botonMenu = document.getElementById('boton-menu');
    const menuPrincipal = document.getElementById('menu-principal');

    if (botonMenu && menuPrincipal) {
        botonMenu.addEventListener('click', () => {
            const abierto = menuPrincipal.classList.toggle('abierto');
            botonMenu.setAttribute('aria-expanded', abierto);
        });
    }

    // 3. Conmutador de Tema (Claro / Oscuro)
    const botonTema = document.getElementById('boton-tema');
    const iconoTema = document.getElementById('icono-tema');

    if (botonTema) {
        botonTema.addEventListener('click', () => {
            const temaActual = document.body.getAttribute('data-tema');
            if (temaActual === 'claro') {
                document.body.removeAttribute('data-tema');
                iconoTema.textContent = '☾';
            } else {
                document.body.setAttribute('data-tema', 'claro');
                iconoTema.textContent = '☀';
            }
        });
    }

    // 4. Animación de revelado al hacer scroll
    const elementosRevelar = document.querySelectorAll('.revelar');
    const observarRevelado = () => {
        const disparadorBottom = window.innerHeight * 0.85;
        elementosRevelar.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < disparadorBottom) {
                el.classList.add('activo');
            }
        });
    };

    window.addEventListener('scroll', observarRevelado);
    observarRevelado(); // Ejecución inicial

    // 5. Botón "Volver arriba"
    const botonArriba = document.getElementById('boton-arriba');
    if (botonArriba) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                botonArriba.classList.remove('oculto');
            } else {
                botonArriba.classList.add('oculto');
            }
        });

        botonArriba.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});