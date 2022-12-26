const db = require("../../../mysql");
const constants = require("../../../../constants/constants");

// user
async function getUserProducts(id) {
  const query = "SELECT * FROM products WHERE user_id = ?";
  return await db.query(query, [id]);
}

async function getProductByid(array_product_id) {
  const query = "SELECT * FROM products WHERE product_id IN (?)";
  return await db.query(query, [array_product_id]);
}

// products_images
async function getProductImages(id) {
  const query =
    "SELECT product_image FROM products_images WHERE product_id = ?";
  return await db.query(query, [id]);
}

async function deleteAllProductImages(product_id) {
  const query = "DELETE FROM products_images WHERE product_id = ?";
  return await db.query(query, [product_id]);
}

async function addProductImages(product_images) {
  const query =
    "INSERT INTO products_images (product_image, product_id, user_id) VALUES ?;";
  return await db.query(query, [product_images]);
}

//products
async function getAllProduct(product_type, limit, offset) {
  let query;
  let count;
  try {
    query = `SELECT * FROM products ${
      product_type ? `WHERE product_type = ${product_type}` : ""
    } LIMIT ${limit} OFFSET ${(offset - 1) * limit}`;

    count = `SELECT COUNT(*) AS total_product FROM products ${
      product_type ? `WHERE product_type = ${product_type}` : ""
    }`;

    const [products] = await db.query(query);
    const [total_product] = await db.query(count);

    return Promise.resolve({
      products: products,
      total_product: total_product[0].total_product,
    });
  } catch (error) {
    return Promise.reject(error);
  }
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
  user_name,
  product_quantity
) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const create_date = new Date().toLocaleDateString("en-US", options);
  const query =
    "INSERT INTO `products` (`product_name`, `product_price`, `user_id`, `create_date`, `product_description`, `product_type`, `user_avatar`, `user_name`, `product_quantity`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  return await db.query(query, [
    product_name,
    product_price,
    user_id,
    create_date,
    product_description,
    product_type,
    user_avatar,
    user_name,
    product_quantity,
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
  getProductByid,
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
