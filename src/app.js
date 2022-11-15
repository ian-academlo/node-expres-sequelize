const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const handleError = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: true })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  console.log("Bienvenido al server");
});

app.use(handleError);

module.exports = app;
