const jwt = require("jsonwebtoken");

const refesh_token = ({ id, email }) => {
  console.log(id, email, "token")
  return jwt.sign({ id, email }, process.env.REFESH_TOKEN_KEY, {
    expiresIn: 60 * 60 *24,
  });
};
const access_token = ({ id, email }) => {
    console.log(id, email, "token")
  return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: 60 * 30,
  });
};

module.exports = {
  refesh_token,
  access_token,
};
