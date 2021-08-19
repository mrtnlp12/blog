const Usuario = require("../models/Usuario");
const generarJWT = require("../helpers/generar_jwt");
const bcrypt = require("bcrypt");

const authUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no valido-no existe",
      });
    }
    const passValido = bcrypt.compareSync(password, usuario.password);

    if (!passValido) {
      return res.status(400).json({
        msg: "Usuario no valido-pass",
      });
    }
    if (!usuario.activo) {
      return res.status(400).json({
        msg: "Usuario no valido-activo",
      });
    }
    const { _id } = usuario;
    const token = await generarJWT(_id);

    return res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Aldo salio mal",
    });
  }
};

module.exports = {
  authUsuario,
};
