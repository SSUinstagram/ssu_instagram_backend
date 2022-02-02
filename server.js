const express = require("express");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const { Login, Signup, Write, Follows } = require("./server/routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const config = require("./config/config.json");
const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: config.session.secret,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db연결");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/login", Login);
app.use("/signup", Signup);
app.use("/write", Write);
app.use("/follow", Follows);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/", async function (req, res) {
  sess = req.session;
  res.send(express.static(path.join(__dirname, "../client/build/index.html")));
});

module.exports = app;
