const express = require("express");
const path = require("path");
const cors = require("cors");
const {sequelize} = require("../models");
const { Login,Signup, Write,Follows} = require("./routes");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("../passport");

app.use(cookieParser(process.env.COOKIE));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "web29",
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

sequelize.sync({force:false}).then(()=>{
  console.log('db연결');
}).catch((err)=>{
  console.err(err);
})

app.use("/login",Login);
app.use("/signup",Signup);
app.use("/write",Write);
app.use("/follow",Follows);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get("/", async function (req, res) {
  sess = req.session;
  res.send(express.static(path.join(__dirname, '../client/build/index.html')));
});

app.listen(8029, async () => {
  console.log("server listening on port  8029");
});
