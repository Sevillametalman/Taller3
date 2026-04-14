// Función para hacer logout (puedes llamarla desde cualquier botón)
async function logOut() {
    await fetch('/administradores/logout', { method: 'POST' });
    window.location.href = 'login.html';
}