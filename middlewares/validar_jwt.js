const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  try {
    const { id } = jwt.verify(token, process.env.PRIVATE_JWT);
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no valido",
      });
    }

    if (!usuario.activo) {
      return res.status(400).json({
        msg: "Usuario inactivo",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Token no valido",
    });
  }
};

module.exports = validarJWT;
