const jwt = require("jsonwebtoken");

const generarJWT = (id) => {
  return new Promise((res, rej) => {
    jwt.sign(
      { id },
      process.env.PRIVATE_JWT,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          rej("No se pudo registrar el token");
        }
        res(token);
      }
    );
  });
};

module.exports = generarJWT;
