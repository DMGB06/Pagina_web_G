const express = require("express");
const { login, register, logout, profile} = require("../controllers/auth.controller.js");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware.js");
const {validatorSchema} = require("../middlewares/validator.middleware.js");
const {registerSchema, loginSchema} = require("../schemas/auth.schema.js");

const router = express.Router();        

//rutas publicas
router.post("/register", validatorSchema(registerSchema), register);
router.post("/login", validatorSchema(loginSchema), login);
router.post("/logout", logout)

// rutas protegida
router.get("/profile",authMiddleware, profile)


module.exports = router;
