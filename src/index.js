import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/administradores', authRoutes); // Rutas de login/logout
app.use(userRoutes);
app.use(express.static('public'));

app.listen(PORT);
console.log("Server on port", PORT);