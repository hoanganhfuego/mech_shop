const userCartModel = require("../../../database/facade/models/user_cart/index");
const userProductsModels = require("../../../database/facade/models/user-prouducts/index");

async function getUserCart(req, res) {
  try {
    const { page, rows_per_page } = req.query;
    const user_id = req.params.user_id;
    const data = await userCartModel.getUserCart(user_id, page, rows_per_page);
    const [products] = await userProductsModels.getProductByid(
      data.data.map((item) => item.product_id)
    );
    const newData = data.data.map((item, index) => ({
      cart_id: item.cart_id,
      product_image: item.product_image,
      cart_quantity: item.cart_quantity,
      product_name: products[index].product_name,
      product_price: products[index].product_price,
      product_quantity: products[index].product_quantity,
    }));
    res.status(200).send({
      carts: newData,
      total_rows: data.total_rows,
      rowsPerPage: Number(rows_per_page),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addProductToCart(req, res) {
  try {
    const { user_id, product_id } = req.params;
    const { cart_quantity, product_image } = req.body;
    const [isProductExist] = await userCartModel.getOneUserCart(
      user_id,
      product_id
    );
    if (!Boolean(isProductExist.length)) {
      await userCartModel.addProductToCart(
        user_id,
        product_id,
        cart_quantity,
        product_image
      );
      return res.status(200).send({ message: "add product success" });
    } else {
      await userCartModel.updateQuantity(
        isProductExist[0].cart_id,
        isProductExist[0].cart_quantity + cart_quantity
      );
      return res.status(200).send({ message: "update quantity success" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProductInCart(req, res) {
  try {
    const { cart_id } = req.query;
    let array_cart_id = cart_id;
    if (typeof cart_id !== "object") {
      array_cart_id = [cart_id];
    }
    await userCartModel.deleteProductInCart(array_cart_id);
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
