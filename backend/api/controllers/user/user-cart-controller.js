const userCartModel = require("../../../database/facade/models/user_cart/index");
const userProductsModels = require("../../../database/facade/models/user-prouducts/index");

async function getUserCart(req, res) {
  try {
    const { page, rows_per_page } = req.query;
    const user_id = req.params.user_id;
    const data = await userCartModel.getUserCart(user_id, page, rows_per_page);
    for (let i = 0; i < data.user_cart.length; i++) {
      const [product] = await userProductsModels.getProductByid(
        data.user_cart[i].product_id
      );
      const [product_image] = await userProductsModels.getProductImages(
        data.user_cart[i].product_id
      );
      data.user_cart[i].product_name = product[0].product_name;
      data.user_cart[i].product_price = product[0].product_price;
      data.user_cart[i].product_quantity = product[0].product_quantity;
      data.user_cart[i].product_image = product_image[0].product_image;
    }
    res.status(200).send({
      user_cart: data.user_cart,
      total_rows: data.total_rows,
      rowsPerPage: Number(rows_per_page),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addProductToCart(req, res) {
  try {
    const {owner_id} = req.body 
    const { user_id, product_id } = req.params;
    const [isProductExist] = await userCartModel.getOneUserCart(
      user_id,
      product_id
    );
    if (Boolean(isProductExist.length)) {
      const [product] = await userProductsModels.getProductByid(
        isProductExist[0].product_id
      );
      if (isProductExist[0].cart_quantity >= product[0].product_quantity) {
        return res
          .status(400)
          .send({ message: "limited number of products has been reached" });
      }
      await userCartModel.updateQuantity(
        isProductExist[0].cart_id,
        isProductExist[0].cart_quantity + 1
      );
      return res.status(200).send({ message: "update quantity success" });
    } else {
      await userCartModel.addProductToCart(user_id, product_id, 1, owner_id);
      return res.status(200).send({ message: "add product success" });
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
