const db = require("../../../mysql");

async function getOneUserInfo({ id }) {
  const query = "SELECT * FROM user WHERE id = ?";
  return db.query(query, [id]);
}

async function getUserInfo() {
  const query = "SELECT * FROM user";
  return await db.query(query);
}

async function signUp({ name, email, password }) {
  const query =
    "INSERT INTO `user` (`name`, `email`, `password`) VALUES (?, ?, ?);";
  return await db.query(query, [name, email, password]);
  s;
}

async function login({ email, password }) {
  const query = "SELECT * FROM user WHERE email = ? AND password = ?";
  return await db.query(query, [email, password]);
}

async function findUserEmail({ email }) {
  const query = "SELECT * FROM user WHERE email = ?";
  return await db.query(query, [email]);
}

module.exports = {
  getUserInfo,
  signUp,
  login,
  findUserEmail,
  getOneUserInfo,
};
