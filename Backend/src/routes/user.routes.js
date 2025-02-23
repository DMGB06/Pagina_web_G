const express = require("express");
const {authMiddleware, adminMiddleware} = require("../middlewares/auth.middleware.js");
const {getuser, getUsers, deleteuser, updateuser, createUser} = require("../controllers/user.controller.js"); 
const { validatorSchema } = require("../middlewares/validator.middleware.js");
const { registerSchema } = require("../schemas/auth.schema.js");

const router = express.Router();


router.post("/users", authMiddleware, adminMiddleware, validatorSchema(registerSchema), createUser)

router.get("/users/:id", authMiddleware, adminMiddleware, getuser)// ruta para obtener un usuario por id

router.get("/users", authMiddleware, adminMiddleware, getUsers)//ruta para obtener todos los usuarios

router.delete("/users/:id", authMiddleware, adminMiddleware, deleteuser) // ruta para eliminar usuario

router.put("/users/:id", authMiddleware, updateuser) // ruta para editar usuario

module.exports = router;