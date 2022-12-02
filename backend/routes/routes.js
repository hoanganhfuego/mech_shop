const userController = require("../api/controllers/user/user-controller");
const auth = require("../api/middleware/auth");
const passport = require("passport");
const generateToken = require("../utils/generateToken");

const routes = (app) => {
  app.namespace("/api", function () {
    // user info
    app.get("/users", auth.verifyToken, userController.getUserInfo);
    // signup and login
    app.post("/signup", userController.signUp);
    app.post("/login", userController.login);
  });

  app.namespace("/auth", function () {
    // auth with normal login method
    app.post("/refresh-token", auth.verifyRefreshToken, (req, res) => {
      const { id, email } = req.body;
      if (!id || !email) {
        return res.status(400).send({ message: "id and email is required" });
      }
      res
        .status(200)
        .send({ access_token: generateToken.access_token({ id, email }) });
    });

    // auth with google
    app.get(
      "/google/callback",
      passport.authenticate(
        "google",
        {
          successRedirect: process.env.CLIENT_URL,
          failureMessage: true,
        },
        () => {
          console.log("fail to login");
        }
      )
    );
    app.get("/google", passport.authenticate("google", ["profile", "email"]));
    app.get("/logout", (req, res) => {
      req.logout();
      res.redirect(process.env.CLIENT_URL);
    });
  });
};

module.exports = routes;
