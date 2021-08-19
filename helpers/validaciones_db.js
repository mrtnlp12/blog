const Post = require("../models/Post");
const Usuario = require("../models/Usuario");

const existeUsuario = async (id) => {
  const usuario = await Usuario.findById(id);

  if (!usuario || !usuario.activo) {
    throw new Error(`El usuario con el id ${id}, no existe`);
  }

  return true;
};

const existePost = async (id) => {
  const post = await Post.findById(id);

  if (!post || !post.activo) {
    throw new Error(`El post con el id ${id}, no existe`);
  }

  return true;
};

module.exports = {
  existeUsuario,
  existePost,
};
