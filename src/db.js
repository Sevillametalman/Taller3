import pkg from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";
const { Pool } = pkg;

export const pool = new Pool({
  user: DB_USER, // Cambia por tu usuario de postgres
  host: DB_HOST,
  password: DB_PASSWORD, // Cambia por tu contraseña
  database: DB_NAME, // Cambia por el nombre de tu base de datos
  port: DB_PORT,
});

export default pool;
