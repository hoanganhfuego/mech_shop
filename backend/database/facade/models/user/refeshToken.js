const db = require("../../../mysql");

async function getToken({ id }) {
  const query = "SELECT refresh_token FROM refresh_token Where id = ?";
  return await db.query(query, [id]);
}

async function createRefeshToken({ refresh_token, initial_date }) {
  const query =
    "INSERT INTO `refresh_token` (`refresh_token`, `initial_date`) VALUES (?, ?);";
  return await db.query(query, [refresh_token, initial_date]);
}

module.exports = {
  getToken,
  createRefeshToken,
};
