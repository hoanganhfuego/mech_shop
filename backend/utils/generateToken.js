const jwt = require("jsonwebtoken");

const refresh_token = ({ id, email }) => {
  return jwt.sign({ id, email }, process.env.REFESH_TOKEN_KEY, {
    expiresIn: 60 * 60,
  });
};
const access_token = ({ id, email }) => {
  return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: 60 * 15,
  });
};

module.exports = {
  refresh_token,
  access_token,
};
