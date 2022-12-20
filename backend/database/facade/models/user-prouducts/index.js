const db = require("../../../mysql");

// user
async function getUserProducts(id) {
  const query = "SELECT * FROM products WHERE user_id = ?";
  return await db.query(query, [id]);
}

// products_images
async function getProductImages(id) {
  const query =
    "SELECT product_image FROM products_images WHERE product_id = ?";
  return await db.query(query, [id]);
}

async function deleteAllProductImages(user_id, product_id) {
  const query =
    "DELETE FROM products_images WHERE user_id = ? AND product_id = ?";
  return await db.query(query, [user_id, product_id]);
}

async function addProductImages(product_image, product_id, user_id) {
  const query =
    "INSERT INTO `products_images` (`product_image`, `product_id`, `user_id`) VALUES (?, ?, ?);";
  return await db.query(query, [product_image, product_id, user_id]);
}

//products
async function getAllProduct() {
  const query = "SELECT * FROM `products`";
  return db.query(query);
}

async function updateProduct(
  product_id,
  product_name,
  product_price,
  product_description,
  product_type
) {
  const query =
    "UPDATE products SET product_name = ?, product_price = ?, product_description = ?, product_type = ? where product_id = ?";
  return await db.query(query, [
    product_name,
    product_price,
    product_description,
    product_type,
    product_id,
  ]);
}

async function addProduct(
  user_id,
  product_name,
  product_price,
  product_description,
  product_type,
  user_avatar,
  user_name
) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const create_date = new Date().toLocaleDateString("en-US", options);
  const query =
    "INSERT INTO `products` (`product_name`, `product_price`, `user_id`, `create_date`, `product_description`, `product_type`, `user_avatar`, `user_name`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  return await db.query(query, [
    product_name,
    product_price,
    user_id,
    create_date,
    product_description,
    product_type,
    user_avatar,
    user_name,
  ]);
}

async function deleteProduct(product_id) {
  const query = "DELETE FROM `products` WHERE product_id = ?";
  return db.query(query, [product_id]);
}

//get product by its type
async function getProductByType(product_type) {
  const query = "SELECT * FROM products WHERE product_type = ?";
  return db.query(query, [product_type]);
}

module.exports = {
  getAllProduct,
  getProductByType,
  deleteProduct,
  addProduct,
  updateProduct,
  addProductImages,
  deleteAllProductImages,
  getUserProducts,
  getProductImages,
};
