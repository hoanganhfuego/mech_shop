const db = require("../../../mysql");

async function getUserProducts(id) {
  const query = "SELECT * FROM products WHERE id = ?";
  return await db.query(query, [id]);
}

module.exports = {
  getUserProducts,
};
