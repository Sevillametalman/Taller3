// ===== JSON estructura =====
let estructura = { campos: [] };
fetch("./campos.json")
  .then((response) => response.json())
  .then((data) => {
    estructura = data;
    // Regenerar el formulario si ya está cargado el DOM
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
    console.error("Error cargando campos.json:", error);
  });

// ===== Generar formulario dinámicamente =====
function generarFormulario() {
  const form = document.getElementById("formulario");
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

// El formulario se generará automáticamente cuando se cargue estructura desde campos.json

// ===== Consultar =====
async function consultarPersona() {
  let cedula = document.getElementById("buscarCedula").value;
  try {
    const response = await fetch(`http://localhost:4000/users/cedula/${cedula}`);
    if (!response.ok) {
      alert("Persona no encontrada");
      return;
    }
    const persona = await response.json();
    document.getElementById("cedula").value = persona.cedula;
    document.getElementById("nombre").value = persona.nombre;
    document.getElementById("apellido").value = persona.apellido;
    document.getElementById("edad").value = persona.edad;
    document.getElementById("genero").value = persona.genero;
    document.getElementById("telefono1").value = persona.telefono1 || "";
    document.getElementById("telefono2").value = persona.telefono2 || "";
    document.getElementById("correo1").value = persona.correo1 || "";
    document.getElementById("correo2").value = persona.correo2 || "";
    document.getElementById("estadoCivil").value = persona.estadoCivil;
    document.getElementById("direccion").value = persona.direccion;
    document.getElementById("departamento").value = persona.departamento;
    document.getElementById("cargo").value = persona.cargo;
  } catch (error) {
    alert("Error de red al buscar persona");
    console.error(error);
  }
}

// ===== Validaciones =====
function validar() {
  let edad = parseInt(document.getElementById("edad").value);
  if (edad <= 15 || edad >= 90) {
    alert("Edad inválida");
    return false;
  }

  let telefonoRegex = /^\d{4}-\d{7}$/;
  let t1 = document.getElementById("telefono1").value;
  let t2 = document.getElementById("telefono2").value;

  if (t1 && !telefonoRegex.test(t1)) {
    alert("Teléfono 1 inválido");
    return false;
  }
  if (t2 && !telefonoRegex.test(t2)) {
    alert("Teléfono 2 inválido");
    return false;
  }

  return true;
}

// ===== Guardar nueva persona en backend =====
async function guardarUser() {
  if (!validar()) return;

  const user = {
    cedula: document.getElementById("cedula").value,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    edad: parseInt(document.getElementById("edad").value),
    genero: document.getElementById("genero").value,
    telefono1: document.getElementById("telefono1").value,
    telefono2: document.getElementById("telefono2").value,
    correo1: document.getElementById("correo1").value,
    correo2: document.getElementById("correo2").value,
    estadoCivil: document.getElementById("estadoCivil").value,
    direccion: document.getElementById("direccion").value,
    departamento: document.getElementById("departamento").value,
    cargo: document.getElementById("cargo").value,
  };

  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(response);
    if (response.ok) {
      alert("Usuario guardado correctamente");
    } else {
      alert(data.error || "Error al guardar usuario");
    }
  } catch (error) {
    alert("Error de red al guardar usuario");
    console.error(error);
  }
}

function descargarPersonas() {
  const dataStr = JSON.stringify(personas, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "personas_actualizado.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
