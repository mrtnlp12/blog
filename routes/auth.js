const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");
const { authUsuario } = require("../controllers/auth");
const validarCampos = require("../middlewares/validar_campos");

router.post(
  "/",
  [
    body("correo", "Faltan datos").notEmpty(),
    body("password", "Faltan datos").notEmpty(),
    validarCampos,
  ],
  authUsuario
);

module.exports = router;
