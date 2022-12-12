const userProductsModels = require("../../../database/facade/models/user-prouducts/index");

async function getUserProducts(req, res) {
  const id = req.params.id;
  const [data] = await userProductsModels.getUserProducts(id);
  return res.status(200).send(data);
}

module.exports = {
  getUserProducts,
};
