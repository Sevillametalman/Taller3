import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  getUserByCedula,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.get("/users/cedula/:cedula", getUserByCedula);

router.post("/users", createUser);

router.delete("/users/:cedula", deleteUser);

router.put("/users/:cedula", (req, res) => {
  const { id } = req.params;
  res.send("Obteniendo Users");
});
export default router;
