const db = require("../../../mysql");

async function getUserOrder(buyer_id) {
  const query = "SELECT * FROM `order` WHERE buyer_id = ?;";
  return await db.query(query, [buyer_id]);
}

async function updateOrderStatus({status, order_id}) {
  console.log(status, order_id)
  const query = "UPDATE `order` SET status = ? WHERE order_id = ?";
  return await db.query(query, [status, order_id]);
}

async function addCheckoutOrder({
  product_id,
  cart_quantity,
  owner_id,
  buyer_id,
  message,
  status,
  name,
  email,
  address_street,
  phone,
  address_prefecture,
  address_district,
  place_order_date,
}) {
  const query =
    "INSERT INTO `order` (`product_id`, `cart_quantity`, `buyer_id`, `status`, `owner_id`, `message`, `buyer_name`,`buyer_email`,`buyer_address_street`,`buyer_phone`,`buyer_address_prefecture`,`buyer_address_district`, `place_order_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  return await db.query(query, [
    product_id,
    cart_quantity,
    buyer_id,
    status,
    owner_id,
    message,
    name,
    email,
    address_street,
    phone,
    address_prefecture,
    address_district,
    place_order_date,
  ]);
}

module.exports = {
  addCheckoutOrder,
  updateOrderStatus,
  getUserOrder,
};
