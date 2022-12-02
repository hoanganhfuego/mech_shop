const db = require("../../../mysql");

async function getToken({ id }) {
  const query = "SELECT refesh_token FROM refesh_token Where id = ?";
  return await db.query(query, [id]);
}

async function createRefeshToken({ refesh_token, initial_date }) {
  const query =
    "INSERT INTO `refesh_token` (`refesh_token`, `initial_date`) VALUES (?, ?);";
  return await db.query(query, [refesh_token, initial_date]);
}

module.exports = {
  getToken,
  createRefeshToken,
};
