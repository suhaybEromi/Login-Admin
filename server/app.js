const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  }),
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .send({ message: "we need token please provide it." });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.status(200).send({ message: "success", name: req.name });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send({ message: "Server Side Error" });

    if (result.length > 0) {
      const name = result[0].name;
      const token = jwt.sign({ name }, process.env.SECRET_KEY);

      res.cookie("token", token);
      return res.status(200).send({ message: "success" });
    } else {
      return res.send({ message: "Failed Login" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "success" });
});

app.listen(8081, () => console.log("listening on port 8081"));
