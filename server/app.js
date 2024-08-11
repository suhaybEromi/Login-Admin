const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  username: "root",
  password: "",
  database: "signup",
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(8081, () => console.log("listening on port 3000"));
