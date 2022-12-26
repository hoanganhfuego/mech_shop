require("dotenv").config();
require("express-namespace");
require("./api/middleware/passportStrategy");
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const cors = require("cors");

app.use(
  cookieSession({
    name: "auth",
    keys: ["442664"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/images", express.static("images"));

const port = process.env.PORT || 5000;

require("./routes/routes")(app);

app.listen(port, () => {
  console.log(`server running on ${port} port`);
});
