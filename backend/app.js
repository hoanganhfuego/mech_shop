require("dotenv").config();
require("express-namespace");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authGoogle = require("./api/middleware/authGoogle")

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["none"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

require("./routes/routes")(app);

app.listen(port, () => {
  console.log("server running on 5000 port");
});
