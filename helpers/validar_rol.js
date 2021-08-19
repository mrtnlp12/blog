const rolValido = (rol) => {
  const rolesPermitidos = ["USER_ROLE", "ADMIN_ROLE"];

  if (rol) {
    if (!rolesPermitidos.includes(rol)) {
      throw new Error(`El rol ${rol} no es permitido`);
    }
  }

  return true;
};
module.exports = {
  rolValido,
};
