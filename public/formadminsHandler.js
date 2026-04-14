
// ===== Cargar y guardar JSON en la base de datos para admins =====
async function cargarYGuardarJSON() {
  const archivo = document.getElementById("archivoJSON").files[0];
  if (!archivo) {
    alert("Seleccione un archivo JSON");
    return;
  }
  const lector = new FileReader();
  lector.onload = async function (event) {
    try {
      const datos = JSON.parse(event.target.result);
      if (!Array.isArray(datos)) {
        alert("El JSON debe ser un arreglo de admins");
        return;
      }
      // Borrar todos los admins antes de insertar
      try {
        await fetch("http://localhost:4000/admins", { method: "DELETE" });
      } catch (e) {
        alert("No se pudo limpiar la base de datos antes de cargar el JSON");
        return;
      }
      // Enviar cada admin al backend
      let exitos = 0, fallos = 0;
      for (const admin of datos) {
        try {
          const response = await fetch("http://localhost:4000/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
          });
          if (response.ok) {
            exitos++;
          } else {
            fallos++;
          }
        } catch {
          fallos++;
        }
      }
      alert(`Admins guardados: ${exitos}, fallidos: ${fallos}`);
    } catch (error) {
      alert("Error al leer el JSON");
    }
  };
  lector.readAsText(archivo);
}

// ===== JSON estructura =====
let estructura = { campos: [] };
fetch("./camposAdmin.json")
  .then((response) => response.json())
  .then((data) => {
    estructura = data;
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      generarFormulario();
    } else {
      document.addEventListener("DOMContentLoaded", generarFormulario);
    }
  })
  .catch((error) => {
    console.error("Error cargando camposAdmin.json:", error);
  });

// ===== Generar formulario dinámicamente =====
function generarFormulario() {
  const form = document.getElementById("formulario");
  form.innerHTML = "";
  estructura.campos.forEach((campo) => {
    let label = document.createElement("label");
    label.innerText = campo.label;
    form.appendChild(label);

    let input;
    if (campo.type === "select") {
      input = document.createElement("select");
      campo.options.forEach((op) => {
        let option = document.createElement("option");
        option.value = op;
        option.text = op;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = campo.type;
    }
    input.id = campo.name;
    form.appendChild(input);
  });
}

// ===== Consultar y llenar formulario =====
async function consultarPersona() {
  let username = document.getElementById("username").value;
  try {
    const response = await fetch(`http://localhost:4000/admins/${username}`);
    if (!response.ok) {
      alert("Admin no encontrado");
      document.getElementById('btn-editar').disabled = true;
      document.getElementById('btn-borrar').disabled = true;
      return;
    }
    const admin = await response.json();
    llenarFormulario(admin);
    document.getElementById('btn-editar').disabled = false;
    document.getElementById('btn-borrar').disabled = false;
  } catch (error) {
    alert("Error de red al buscar admin");
    console.error(error);
    document.getElementById('btn-editar').disabled = true;
    document.getElementById('btn-borrar').disabled = true;
  }
}

// Deshabilitar editar/borrar si cambia el username
document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      document.getElementById('btn-editar').disabled = true;
      document.getElementById('btn-borrar').disabled = true;
    });
  }
});

// Llenar el formulario con los datos de un admin
function llenarFormulario(admin) {
  document.getElementById("username").value = admin.username || "";
  document.getElementById("password").value = admin.password || "";
}

// ===== Editar admin (PUT) =====
async function editarUser() {
  if (!validar()) return;
  const username = document.getElementById("username").value;
  const admin = {
    password: document.getElementById("password").value
  };
  try {
    const response = await fetch(`http://localhost:4000/admins/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Admin editado correctamente");
    } else {
      alert(data.error || "Error al editar admin");
    }
  } catch (error) {
    alert("Error de red al editar admin");
    console.error(error);
  }
}

// ===== Borrar admin (DELETE) =====
async function borrarUser() {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Primero consulta o ingresa un username válido");
    return;
  }
  if (!confirm("¿Seguro que deseas borrar este admin?")) return;
  try {
    const response = await fetch(`http://localhost:4000/admins/${username}`, {
      method: "DELETE"
    });
    if (response.ok) {
      alert("Admin borrado correctamente");
      document.getElementById("formulario").reset();
    } else {
      alert("Error al borrar admin");
    }
  } catch (error) {
    alert("Error de red al borrar admin");
    console.error(error);
  }
}

// ===== Validaciones para admin =====
function validar() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (!username) {
    alert("Username es obligatorio");
    return false;
  }
  if (!password) {
    alert("Password es obligatorio");
    return false;
  }
  return true;
}

// ===== Guardar nuevo admin en backend =====
async function guardarUser() {
  if (!validar()) return;

  const admin = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch("http://localhost:4000/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Admin guardado correctamente");
    } else {
      alert(data.error || "Error al guardar admin");
    }
  } catch (error) {
    alert("Error de red al guardar admin");
    console.error(error);
  }
}

// ===== Descargar admins como JSON =====
async function descargarPersonas() {
  const adminsFetch = await fetch("http://localhost:4000/admins");
  const admins = await adminsFetch.json();
  const dataStr = JSON.stringify(admins, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "admins.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
