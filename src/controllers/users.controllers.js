import pool from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users`);
    res.json(rows);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
  }
};

// Buscar usuario por cédula
export const getUserByCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE cedula = $1", [
      cedula,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      cedula,
      nombre,
      apellido,
      edad,
      genero,
      telefono1,
      telefono2,
      correo1,
      correo2,
      estadoCivil,
      direccion,
      departamento,
      cargo,
    } = req.body;

    // Validación básica
    if (
      !cedula ||
      !nombre ||
      !apellido ||
      !genero ||
      !telefono1 ||
      !correo1 ||
      !estadoCivil ||
      !direccion
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (isNaN(edad) || edad < 16 || edad > 89) {
      return res.status(400).json({ error: "Edad inválida" });
    }

    // Insertar en la base de datos
    const result = await pool.query(
      `INSERT INTO users (
				cedula, nombre, apellido, edad, genero, telefono1, telefono2, correo1, correo2, estadoCivil, direccion, departamento, cargo
			) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [
        cedula,
        nombre,
        apellido,
        edad,
        genero,
        telefono1,
        telefono2,
        correo1,
        correo2,
        estadoCivil,
        direccion,
        departamento,
        cargo,
      ],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      res.status(400).json({ error: "La cédula ya existe" });
    } else {
      res.status(500).json({ error: "Error al guardar usuario" });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { cedula } = req.params;
    const result = await pool.query(`DELETE FROM users WHERE cedula = $1`, [
      cedula,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};
