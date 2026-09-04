/* ============================================================
   CONTROL GLOBAL DE SESIÓN EN EL ENCABEZADO
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navVisitante = document.getElementById('nav-visitante');
    const navUsuario = document.getElementById('nav-usuario');
    const navNombreUsuario = document.getElementById('nav-nombre-usuario');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const usuarioLogueado = localStorage.getItem('usuarioActivo');

    if (navVisitante) navVisitante.style.display = usuarioLogueado ? 'none' : 'flex';
    if (navUsuario) navUsuario.style.display = usuarioLogueado ? 'flex' : 'none';
    if (usuarioLogueado && navNombreUsuario) navNombreUsuario.textContent = `Hola, ${usuarioLogueado}`;

    btnCerrarSesion?.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('usuarioActivo');
        window.location.href = 'index.html';
    });
});
