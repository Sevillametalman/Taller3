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
        <td>${user.id}</td>
        <td>${user.cedula}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.edad}</td>
        <td>${user.genero}</td>
        <td>${user.telefono1 || ''}</td>
        <td>${user.telefono2 || ''}</td>
        <td>${user.correo1 || ''}</td>
        <td>${user.correo2 || ''}</td>
        <td>${user.estadocivil}</td>
        <td>${user.direccion}</td>
        <td>${user.departamento || ''}</td>
        <td>${user.cargo || ''}</td>
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
      console.log(persona)
      persona.sort((a, b) => a.cedula - b.cedula);
      persona.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.cedula}</td>
          <td>${p.nombre}</td>
          <td>${p.apellido}</td>
          <td>${p.edad}</td>
          <td>${p.genero}</td>
          <td>${p.telefono1 || ''}</td>
          <td>${p.telefono2 || ''}</td>
          <td>${p.correo1 || ''}</td>
          <td>${p.correo2 || ''}</td>
          <td>${p.estadocivil}</td>
          <td>${p.direccion}</td>
          <td>${p.departamento || ''}</td>
          <td>${p.cargo || ''}</td>
        `;
        table.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.cedula}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.edad}</td>
        <td>${persona.genero}</td>
        <td>${persona.telefono1 || ''}</td>
        <td>${persona.telefono2 || ''}</td>
        <td>${persona.correo1 || ''}</td>
        <td>${persona.correo2 || ''}</td>
        <td>${persona.estadocivil}</td>
        <td>${persona.direccion}</td>
        <td>${persona.departamento || ''}</td>
        <td>${persona.cargo || ''}</td>
      `;
      table.appendChild(row);
    }
  } catch (error) {
    console.error(error);
  }
}
