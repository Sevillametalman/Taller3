import pool from "../db.js";
import jwt from "jsonwebtoken";

// En producción, esto DEBE venir de variables de entorno (process.env.JWT_SECRET)
const SECRET_KEY = "cat";

// Middleware para verificar JWT desde cookie
function verifyJWT(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ message: "No autenticado" });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

// Endpoint para saber si el usuario está autenticado
export const me = [
  verifyJWT,
  async (req, res) => {
    try {
      // Puedes devolver más datos si quieres
      res.json({ id: req.user.id });
    } catch {
      res.status(500).json({ message: "Error interno" });
    }
  },
];

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Buscar el usuario en la base de datos
    const { rows } = await pool.query(
      "SELECT * FROM admins WHERE username = $1",
      [username],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // 2. Verificar la contraseña
    // NOTA: Aquí estoy comparando texto plano. En un proyecto real DEBES usar bcrypt:
    // const isValid = await bcrypt.compare(password, user.password);
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3. Crear el token JWT (guardamos el ID y la cédula dentro del token)
    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // 4. Enviar la cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    // 5. Responder con los datos útiles (evita enviar la contraseña de vuelta)
    res.json({
      message: "Login exitoso",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error en el servidor al intentar iniciar sesión" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logout exitoso" });
};
