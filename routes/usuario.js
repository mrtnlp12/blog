const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuario");
const { existeUsuario, rolValido } = require("../helpers");
const validarCampos = require("../middlewares/validar_campos");
const router = Router();

router.get("/", obtenerUsuarios);
router.post(
  "/",
  [
    body("nombre", "El nombre es obligatorio").notEmpty(),
    body("password", "El password es obligatorio").notEmpty(),
    body("correo", "El correo es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    param("id", "No es un id valido").isMongoId(),
    param("id").custom(existeUsuario),
    body("rol").custom(rolValido),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
  "/:id",
  [
    param("id", "No es un id valido").isMongoId(),
    param("id").custom(existeUsuario),
    validarCampos,
  ],
  borrarUsuario
);
module.exports = router;
