// Script para poblar la tabla de usuarios en tabla.html desde la base de datos
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:4000/users");
    if (!response.ok)
      throw new Error("No se pudo obtener la lista de usuarios");
    const users = await response.json();
    users.sort((a, b) => a.cedula - b.cedula);
    const table = document.getElementById("main-table");
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.cedula}</td>
        <td>${user.edad}</td>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
});

async function consultarPorCedula() {
  try {
    let cedula = document.getElementById("buscarCedula").value;
    const table = document.getElementById("main-table");
    let response;

    if (!cedula) {
      response = await fetch(`http://localhost:4000/users`);
    } else {
      response = await fetch(`http://localhost:4000/users/cedula/${cedula}`);
    }

    if (!response.ok) {
      alert("Persona no encontrada");
      return;
    }

    let persona = await response.json();

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    if (Array.isArray(persona)) {
      persona.sort((a, b) => a.cedula - b.cedula);
      persona.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.apellido}</td>
          <td>${p.cedula}</td>
          <td>${p.edad}</td>
        `;
        table.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.cedula}</td>
        <td>${persona.edad}</td>
      `;
      table.appendChild(row);
    }
  } catch (error) {
    console.error(error);
  }
}
