const Usuario = require("../models/Usuario");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const subirArchivo = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  if (usuario.img) {
    const nombreArr = usuario.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  try {
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    usuario.img = secure_url;
    await usuario.save();
  } catch (error) {
    console.log(error);
  }
  res.json({
    usuario,
  });
};

module.exports = {
  subirArchivo,
};
