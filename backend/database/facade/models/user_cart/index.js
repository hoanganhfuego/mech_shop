const db = require("../../../mysql");

async function getOneUserCart(user_id, product_id) {
  const query = "SELECT * FROM `cart` WHERE user_id = ? AND product_id = ?";
  return await db.query(query, [user_id, product_id]);
}

async function getUserCart(user_id, page, limit) {
  try {
    const query = `SELECT * FROM cart WHERE user_id = ? LIMIT ${limit} OFFSET ${
      page * limit
    }`;
    const queryCount =
      "SELECT COUNT(*) AS total_rows FROM `cart` WHERE user_id = ?";
    const [data] = await db.query(query, [user_id]);
    const [total_rows] = await db.query(queryCount, [user_id]);
    return Promise.resolve({
      user_cart: data,
      total_rows: total_rows[0].total_rows,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function addProductToCart(user_id, product_id, cart_quantity, owner_id) {
  const query =
    "INSERT INTO `cart` (`product_id`, `cart_quantity`, `user_id`, `owner_id`) VALUES (?, ?, ?, ?)";
  return await db.query(query, [product_id, cart_quantity, user_id, owner_id]);
}

async function deleteProductInCart(cart_id) {
  const query = "DELETE FROM cart WHERE cart_id IN (?)";
  return await db.query(query, [cart_id]);
}

async function updateQuantity(cart_id, cart_quantity) {
  const query = " UPDATE cart SET cart_quantity = ? WHERE cart_id = ?";
  return await db.query(query, [cart_quantity, cart_id]);
}

async function getUserCartList(user_id) {
  const query_cartList =
    "SELECT cart_id, product_id, cart_quantity FROM cart WHERE user_id = ?";
  const query_productQuantityList =
    "SELECT product_quantity, product_id from products WHERE product_id = ?";
  const [cartList] = await db.query(query_cartList, [user_id]);
  for (let i = 0; i < cartList.length; i++) {
    const [product_quantity] = await db.query(query_productQuantityList, [
      cartList[i].product_id,
    ]);
    cartList[i].product_quantity = product_quantity[0].product_quantity;
  }
  return Promise.resolve(cartList);
}

module.exports = {
  getUserCartList,
  getOneUserCart,
  getUserCart,
  addProductToCart,
  deleteProductInCart,
  updateQuantity,
};
