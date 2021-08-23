const { Router } = require("express");
const { param } = require("express-validator");
const { subirArchivo } = require("../controllers/upload");
const { existeUsuario } = require("../helpers/validaciones_db");
const { existeArchivo } = require("../middlewares/validar_archivo");
const validarCampo = require("../middlewares/validar_campos");
const router = Router();

router.post(
  "/:id",
  [
    param("id", "No es un id valido").isMongoId(),
    param("id").custom(existeUsuario),
    existeArchivo,
    validarCampo,
  ],
  subirArchivo
);

module.exports = router;
