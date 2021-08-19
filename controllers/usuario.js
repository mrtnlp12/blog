const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const crearUsuario = async (req = request, res = response) => {
  const { nombre, password, correo } = req.body;

  const usuario = new Usuario({ nombre, password, correo });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password.toString(), salt);

  usuario.password = hash;

  try {
    await usuario.save();

    res.status(200).json({
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo crear usuario - [Problemas del servidor]",
    });
  }
};

const obtenerUsuarios = async (req = request, res = response) => {
  const { desde = 0, hasta = 5 } = req.query;

  try {
    const [usuarios, total] = await Promise.all([
      Usuario.find({ activo: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate("post", { usuario: 0, __v: 0 }),
      Usuario.countDocuments({ activo: true }),
    ]);

    res.status(200).json({
      total,
      usuarios,
    });
  } catch (error) {
    console.log(error);
  }
};

const actualizarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, __v, activo, ...data } = req.body;

  if (data.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password.toString(), salt);

    data.password = hash;
  }

  const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    usuario,
  });
};

const borrarUsuario = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );

  res.status(200).json({
    usuario,
  });
};
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  borrarUsuario,
};
