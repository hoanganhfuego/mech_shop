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
      res.status(401).send({ message: error.message });
    }
  } else {
    return res.status(401).send("a request was sent without access token");
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
      res.status(401).send({ message: error.message });
    }
  } else {
    return res.status(401).send("a request was sent without refresh token");
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};
