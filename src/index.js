import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import morgan from 'morgan'

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // Necesario para leer JSON en req.body
app.use(userRoutes);
app.use(express.static('public'));

app.listen(PORT);
console.log("Server on port", PORT);