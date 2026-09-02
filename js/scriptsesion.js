/* =========================================
   Control Global de Sesión en el Encabezado
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const navVisitante = document.getElementById('nav-visitante');
    const navUsuario = document.getElementById('nav-usuario');
    const navNombreUsuario = document.getElementById('nav-nombre-usuario');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

    // 1. Verificar si hay un usuario guardado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioActivo');

    if (usuarioLogueado) {
        // Hay sesión: Ocultar ingresar/registrar, mostrar nombre y cerrar sesión
        if (navVisitante) navVisitante.style.display = 'none';
        if (navUsuario) {
            navUsuario.style.display = 'flex';
            navNombreUsuario.textContent = `Hola, ${usuarioLogueado}`;
        }
    } else {
        // No hay sesión: Mostrar ingresar/registrar
        if (navVisitante) navVisitante.style.display = 'flex';
        if (navUsuario) navUsuario.style.display = 'none';
    }

    // 2. Lógica para el botón "Cerrar Sesión"
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace salte hacia arriba
            
            // Borramos el dato del navegador
            localStorage.removeItem('usuarioActivo');
            
            // Recargamos la página o redirigimos al index
            window.location.href = 'index.html';
        });
    }
});