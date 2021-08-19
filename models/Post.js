const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const postSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    default: new Date().toUTCString(),
  },
  usuario: {
    type: ObjectId,
    ref: "Usuario",
  },
});

postSchema.methods.toJSON = function () {
  const { __v, usuario, ...data } = this.toObject();

  return data;
};

module.exports = model("Post", postSchema);
