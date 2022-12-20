const db = require("../../../mysql");

async function updateUserInformation(
  id,
  {
    user_avatar,
    name,
    gender,
    email,
    phone,
    birth_year,
    birth_month,
    birth_day,
    address_prefecture,
    address_district,
    address_street,
  }
) {
  const query = `UPDATE user SET user_avatar = '${user_avatar}', name = '${name}', email = '${email}', gender = '${gender}', phone = '${phone}', birth_year = '${birth_year}', birth_month = '${birth_month}', birth_day = '${birth_day}', address_prefecture = '${address_prefecture}', address_district = '${address_district}', address_street = '${address_street}' WHERE id = '${id}';`;
  return await db.query(query);
}

async function getOneUserInfo(id) {
  const query = "SELECT * FROM user WHERE id = ?";
  return db.query(query, [id]);
}

async function getUserInfo() {
  const query = "SELECT * FROM user";
  return await db.query(query);
}

async function signUp({ name, email, password }) {
  if (password) {
    const query =
      "INSERT INTO `user` (`name`, `email`, `password`) VALUES (?, ?, ?);";
    return await db.query(query, [name, email, password]);
  } else {
    const query = "INSERT INTO `user` (`name`, `email`) VALUES (?, ?);";
    return await db.query(query, [name, email]);
    s;
  }
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
  updateUserInformation,
  getUserInfo,
  signUp,
  login,
  findUserEmail,
  getOneUserInfo,
};
