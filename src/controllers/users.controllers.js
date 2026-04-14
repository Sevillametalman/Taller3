import pool from "../db.js";

//Buscar usuarios
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

//Buscar usuario por ID
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

//Crear usuario
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
      estadocivil,
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
      !estadocivil ||
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
        estadocivil,
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

//Borrar usuario
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

// Borrar todos los usuarios
export const deleteAllUsers = async (req, res) => {
  try {
    await pool.query("DELETE FROM users");
    res.json({ message: "Todos los usuarios han sido eliminados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al borrar todos los usuarios" });
  }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { cedula } = req.params;
    const {
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

    const result = await pool.query(
      `UPDATE users SET 
        nombre = $1, apellido = $2, edad = $3, genero = $4, telefono1 = $5, telefono2 = $6, correo1 = $7, correo2 = $8, estadoCivil = $9, direccion = $10, departamento = $11, cargo = $12
        WHERE cedula = $13 RETURNING *`,
      [
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
        cedula,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Persona no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM admins");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener admins" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM admins WHERE username = $1`,
      [username],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar admin" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const result = await pool.query(
      `INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      res.status(400).json({ error: "El username ya existe" });
    } else {
      res.status(500).json({ error: "Error al guardar admin" });
    }
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(`DELETE FROM admins WHERE username = $1`, [
      username,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al borrar admin" });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    const result = await pool.query(
      `UPDATE admins SET password = $1 WHERE username = $2 RETURNING *`,
      [password, username],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar admin" });
  }
};
