const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
    default: "USER_ROLE",
  },
  activo: {
    type: Boolean,
    default: true,
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
      default: [],
    },
  ],
});

usuarioSchema.methods.toJSON = function () {
  const { activo, password, __v, _id, ...data } = this.toObject();

  data.uid = _id;

  return data;
};

module.exports = model("Usuario", usuarioSchema);
