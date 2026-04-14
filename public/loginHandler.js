
// Redirección automática a login.html si no está autenticado (excepto en login.html)
async function checkAuth() {
    if (window.location.pathname.endsWith('login.html')) return;
    try {
        const res = await fetch('/administradores/me');
        if (!res.ok) {
            window.location.href = 'login.html';
        }
    } catch {
        window.location.href = 'login.html';
    }
}
checkAuth();

// Login (solo si existe el formulario)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'none';
        try {
            const response = await fetch('/administradores/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                errorDiv.textContent = data.message || 'Credenciales incorrectas';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            errorDiv.textContent = 'Error de red';
            errorDiv.style.display = 'block';
        }
    });
}

// Logout global para todas las vistas

// Función para hacer logout (puedes llamarla desde cualquier botón)
async function addLogoutToNav() {
    await fetch('/administradores/logout', { method: 'POST' });
    window.location.href = 'login.html';
}