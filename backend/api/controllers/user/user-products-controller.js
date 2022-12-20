const userProductsModels = require("../../../database/facade/models/user-prouducts/index");

async function getImages(data) {
  const productImageIds = data.map((item) => {
    return item.product_id;
  });
  const imagesUrl = await Promise.all(
    productImageIds.map((id) => {
      return userProductsModels.getProductImages(id);
    })
  );
  const products = data.map((product, index) => {
    product.product_images = imagesUrl[index][0];
    return product;
  });
  return Promise.resolve(products);
}

async function getUserProducts(req, res) {
  try {
    const id = req.params.id;
    const [data] = await userProductsModels.getUserProducts(id);
    const products = await getImages(data);
    return res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateUserProduct(req, res) {
  try {
    const { userId, productId } = req.params;
    const {
      product_name,
      product_price,
      product_description,
      product_images,
      product_type,
    } = req.body;
    await userProductsModels.updateProduct(
      productId,
      product_name,
      product_price,
      product_description,
      product_type
    );
    await userProductsModels.deleteAllProductImages(userId, productId);
    for (let i = 0; i < product_images.length; i++) {
      await userProductsModels.addProductImages(
        product_images[i].product_image,
        productId,
        userId
      );
    }
    res.status(200).send({ message: "update product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addProduct(req, res) {
  try {
    const user_id = req.params.userId;
    const {
      product_name,
      product_price,
      product_description,
      product_images,
      product_type,
      user_avatar,
      user_name,
    } = req.body;
    const [data] = await userProductsModels.addProduct(
      user_id,
      product_name,
      product_price,
      product_description,
      product_type,
      user_avatar,
      user_name
    );
    const product_id = data.insertId;
    for (let i = 0; i < product_images.length; i++) {
      await userProductsModels.addProductImages(
        product_images[i].product_image,
        product_id,
        user_id
      );
    }
    res.status(200).send({ message: "add product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product_id = req.params.productId;
    await userProductsModels.deleteProduct(product_id);
    res.status(200).send({ message: "delete product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getProductByType(req, res) {
  try {
    const type = req.params.type;
    const [data] = await userProductsModels.getProductByType(type);
    const products = await getImages(data);
    return res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const [data] = await userProductsModels.getAllProduct();
    const products = await getImages(data);
    res.status(200).send(products);
  } catch (error) {}
}

module.exports = {
  getAllProducts,
  getProductByType,
  deleteProduct,
  addProduct,
  getUserProducts,
  updateUserProduct,
};
