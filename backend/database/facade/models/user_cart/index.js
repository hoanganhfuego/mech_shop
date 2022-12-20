const db = require("../../../mysql");

async function getUserCart(user_id) {
  const query = "SELECT * FROM `cart` WHERE use_id = ?";
  return await db.query(query, [user_id]);
}

async function addProductToCart(product_id, quantity, user_id) {
  const query =
    "INSERT INTO `cart` (`product_id`, `quantity`, `user_id`) VALUES (?, ?, ?)";
  return await db.query(query, [product_id, quantity, user_id]);
}

async function deleteProductInCart(cart_id) {
  const query = "DELETE FROM cart WHERE cart_id = ?";
  return await db.query(query, [cart_id]);
}

async function updateQuantity(cart_id, quantity) {
  const query = " UPDATE cart SET quantity = ? WHERE cart_id = ?";
  return await db.query(query, [quantity, cart_id]);
}

module.exports = {
  getUserCart,
  addProductToCart,
  deleteProductInCart,
  updateQuantity,
};
