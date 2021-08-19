const rolHelper = require("./validar_rol");
const dbHelper = require("./validaciones_db");

module.exports = {
  ...rolHelper,
  ...dbHelper,
};
