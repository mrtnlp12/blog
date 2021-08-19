const { response, request } = require("express");
const Post = require("../models/Post");
const Usuario = require("../models/Usuario");

const obtenerPosts = async (req, res) => {
  const { desde = 0, hasta = 5 } = req.query;

  const [total, posts] = await Promise.all([
    Post.countDocuments(),
    Post.find().skip(Number(desde)).limit(Number(hasta)).populate("usuario"),
  ]);

  res.status(200).json({
    total,
    posts,
  });
};

const subirPost = async (req, res) => {
  const { titulo, descripcion } = req.body;

  const post = new Post({ titulo, descripcion });

  post.usuario = req.usuario._id;

  const usuario = await Usuario.findById(req.usuario._id);
  usuario.post.push(post._id);

  await usuario.save();
  await post.save();

  res.json({
    post,
  });
};

const actualizarPost = async (req = request, res = response) => {
  const { titulo, descripcion } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { titulo, descripcion },
      { new: true }
    );
    res.status(200).json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const eliminarPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    { activo: true },
    { new: true }
  );

  res.status(200).json({
    post,
  });
};

module.exports = {
  obtenerPosts,
  subirPost,
  actualizarPost,
  eliminarPost,
};
