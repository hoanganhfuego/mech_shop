const orderModel = require("../../../database/facade/models/order/index");
const userProductsController = require("../../../database/facade/models/user-prouducts/index");

async function getUserOrder(req, res) {
  try {
    const { buyer_id } = req.params;
    const [orders] = await orderModel.getUserOrder(Number(buyer_id));
    for (let i = 0; i < orders.length; i++) {
      const [product] = await userProductsController.getProductByid(
        orders[i].product_id
      );
      const [product_image] = await userProductsController.getProductImages(
        orders[i].product_id
      );

      product[0].product_image = product_image[0].product_image;

      orders[i].product = product[0];
    }
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addCheckoutOrder(req, res) {
  try {
    const {
      product,
      message,
      name,
      email,
      address_street,
      phone,
      address_prefecture,
      address_district,
      buyer_id,
    } = req.body;
    for (let i = 0; i < product.length; i++) {
      await orderModel.addCheckoutOrder({
        product_id: product[i].product_id,
        owner_id: product[i].owner_id,
        cart_quantity: product[i].cart_quantity,
        buyer_id: buyer_id || 0,
        status: "wait for owner comfirm",
        message,
        name,
        email,
        address_street,
        phone,
        address_prefecture,
        address_district,
        place_order_date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    }
    res.status(200).send("place order success");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    await orderModel.updateOrderStatus(req.body);
    res.status(200).send({ message: "update order status success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  addCheckoutOrder,
  updateOrderStatus,
  getUserOrder,
};
