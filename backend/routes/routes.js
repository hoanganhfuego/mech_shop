const userController = require("../api/controllers/user/user-controller");
const userProductsController = require("../api/controllers/user/user-products-controller");
const userCartController = require("../api/controllers/user/user-cart-controller");
const userOrderController = require("../api/controllers/order/order-controller")

const passport = require("passport");
const auth = require("../api/middleware/auth");
const generateToken = require("../utils/generateToken");
const common = require("../api/controllers/common/common");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const routes = (app) => {
  app.namespace("/api", function () {
    // user info
    app.get("/users", auth.verifyToken, userController.getUserInfo);
    app.get(
      "/user-information/:id",
      auth.verifyToken,
      userController.getOneUserInfo
    );
    app.patch(
      "/user-update-information/:id",
      auth.verifyToken,
      userController.updateUserInformation
    );

    // user products
    app.get(
      "/user-products/:id",
      auth.verifyToken,
      userProductsController.getUserProducts
    );
    app.patch(
      "/user-products/:user_id/product/:product_id",
      auth.verifyToken,
      userProductsController.updateUserProduct
    );
    app.post(
      "/user-products/:user_id",
      auth.verifyToken,
      userProductsController.addProduct
    );
    app.delete(
      "/user-products/:product_id",
      auth.verifyToken,
      userProductsController.deleteProduct
    );

    //products
    app.get("/all-products", userProductsController.getAllProducts);

    //cart
    app.get(
      "/cart-products/:user_id",
      auth.verifyToken,
      userCartController.getUserCart
    );
    app.post(
      "/cart-products/user/:user_id/product/:product_id",
      auth.verifyToken,
      userCartController.addProductToCart
    );
    app.delete(
      "/cart-products/delete",
      auth.verifyToken,
      userCartController.deleteProductInCart
    );
    app.patch(
      "/cart-products/cart_id/:cart_id/quantity/:quantity",
      auth.verifyToken,
      userCartController.updateQuantity
    );

    //checkout order
    app.post("/checkout-order/", userOrderController.addCheckoutOrder);
    app.get("/user-order/:buyer_id", auth.verifyToken, userOrderController.getUserOrder)
    app.patch("/user-order/update", auth.verifyToken, userOrderController.updateOrderStatus)

    // signup and login
    app.post("/signup", userController.signUp);
    app.post("/login", userController.login);

    //common
    app.post(
      "/post-image",
      auth.verifyToken,
      upload.array("file", 10),
      common.postImage
    );

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
  });

  app.namespace("/auth", function () {
    app.get(
      "/google",
      passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
      })
    );

    app.get(
      "/google/callback",
      passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
      }),
      (req, res) => {
        res.send("Thank you for signing in!");
      }
    );

    app.get("/login/success", (req, res) => {
      if (req.user) {
        res.status(200).json(req.user);
      } else {
        res.status(403).json({ error: true, message: "Unauthorized" });
      }
    });

    app.get("login/failed", (req, res) => {
      res.status(403).json({
        error: true,
        message: "Log in failure",
      });
    });

    app.get("/logout", (req, res) => {
      req.logout();
      res.redirect(process.env.CLIENT_URL);
    });
  });
};

module.exports = routes;
