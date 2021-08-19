const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const { conectarDB } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.paths = {
      login: "/api/v1/usuario",
      post: "/api/v1/post",
      auth: "/api/v1/auth",
    };
    this.db();
    this.middlewares();
    this.routes();
  }

  db() {
    conectarDB();
  }

  routes() {
    this.app.use(this.paths.login, require("../routes/usuario"));
    this.app.use(this.paths.post, require("../routes/post"));
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${this.PORT}`);
    });
  }
}

module.exports = Server;
