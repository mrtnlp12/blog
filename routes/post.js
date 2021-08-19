const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  obtenerPosts,
  subirPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/post");
const { existePost } = require("../helpers");
const validarCampos = require("../middlewares/validar_campos");
const validarJWT = require("../middlewares/validar_jwt");
const router = Router();

router.get("/", obtenerPosts);
router.post(
  "/",
  [
    validarJWT,
    body("titulo", "El titulo es obligatorio").notEmpty(),
    body("descripcion", "La descripcion es obligatoria").notEmpty(),
    validarCampos,
  ],
  subirPost
);

router.put(
  "/:id",
  [
    validarJWT,
    param("id", "No es un id valido").isMongoId(),
    param("id").custom(existePost),
    body("titulo", "El titulo es obligatorio").notEmpty(),
    body("descripcion", "La descripcion es obligatoria").notEmpty(),
  ],
  actualizarPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    param("id", "No es un id valido").isMongoId(),
    param("id").custom(existePost),
  ],
  eliminarPost
);

module.exports = router;
