const userCartModel = require("../../../database/facade/models/user_cart/index");

async function getUserCart(req, res) {
  try {
    const user_id = req.params.userId;
    const [data] = await userCartModel.getUserCart(user_id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addProductToCart(req, res) {
  try {
    const { user_id, product_id } = req.params;
    const { quantity } = req.body;
    await userCartModel.addProductToCart(user_id, product_id, quantity);
    res.status(200).send({ message: "add product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProductInCart(req, res) {
  try {
    const cart_id = req.params.cartId;
    await userCartModel.deleteProductInCart(cart_id);
    res.status(200).send({ message: "delete product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateQuantity(req, res) {
  try {
    const { cart_id, quantity } = req.params;
    await userCartModel.updateQuantity(cart_id, quantity);
    res.status(200).send({ message: "update quantity success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  getUserCart,
  addProductToCart,
  deleteProductInCart,
  updateQuantity,
};
