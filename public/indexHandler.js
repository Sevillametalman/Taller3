// Función para hacer logout (puedes llamarla desde cualquier botón)
async function logOut() {
    await fetch('/admins/logout', { method: 'POST' });
    window.location.href = 'login.html';
}