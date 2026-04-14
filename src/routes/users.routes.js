import { Router } from "express";
import {
  getUser,
  getUsers,
  getUserByCedula,
  createUser,
  deleteUser,
  updateUser,
  deleteAllUsers,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.get("/users/cedula/:cedula", getUserByCedula);

router.post("/users", createUser);

// Borrar todos los usuarios
router.delete("/users", deleteAllUsers);

router.delete("/users/:cedula", deleteUser);

router.put("/users/:cedula", updateUser);

//ADMINS
router.get("/admins", getAdmins);
router.get("/admins/:username", getAdmin);
router.post("/admins", createAdmin);
router.delete("/admins/:username", deleteAdmin);
router.put("/admins/:username", updateAdmin);

export default router;
