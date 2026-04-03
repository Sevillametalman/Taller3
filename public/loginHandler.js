
// Redirección automática a login.html si no hay token (excepto en login.html)
if (!document.cookie.includes('auth_token') && !window.location.pathname.endsWith('login.html')) {
    window.location.href = 'login.html';
}

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
            const response = await fetch('/admins/login', {
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
    await fetch('/admins/logout', { method: 'POST' });
    window.location.href = 'login.html';
}