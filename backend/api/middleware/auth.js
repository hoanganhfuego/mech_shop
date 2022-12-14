const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  if (req.headers["x-access-token"]) {
    try {
      const access_token = await req.headers["x-access-token"];
      const decodedToken = await jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_KEY
      );
      const user = await decodedToken;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error, message: "unauthorized" });
    }
  } else {
    return res.status(400).send("invalid request");
  }
}

async function verifyRefreshToken(req, res, next) {
  if (req.headers["x-access-token"]) {
    try {
      const refresh_token = req.body.refresh_token;
      const decodedToken = await jwt.verify(
        refresh_token,
        process.env.REFESH_TOKEN_KEY
      );
      const user = await decodedToken;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error, message: "unauthorized", reset_refresh_token: true });
    }
  } else {
    return res.status(400).send("invalid request");
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};
