require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const routes = require("./routes");
const cors = require("cors");

const HOST = process.env.host,
  PUERTO = process.env.port,
  USER = process.env.user,
  PASSWORD = process.env.password,
  DATABASE = process.env.database;

//settings
const dbOptions = {
  host: HOST,
  port: PUERTO,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
};
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());
app.use(cors());

//routes
//app.use("/", routes);
app.use("/api", routes);

//server
app.listen(app.get("port"), () => {
  console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
});
