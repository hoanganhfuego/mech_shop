const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mech_shop', 'root', 'anh753918426', {
  host: 'localhost',
  dialect: 'mysql'
})

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database')
  } catch (error) {
    console.log('Unable to connect to database', error)
  }
}

const Product = sequelize.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  create_date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_description: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: false, // Disable automatic timestamps
});

const userProductsModels = require("../../../database/facade/models/user-prouducts/index");
const userCartModel = require("../../../database/facade/models/user_cart");

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
    const { user_id, product_id } = req.params;
    const {
      product_name,
      product_price,
      product_description,
      product_images,
      product_type,
      product_condition,
    } = req.body;
    await userProductsModels.updateProduct(
      product_id,
      product_name,
      product_price,
      product_description,
      product_type,
      product_condition
    );
    await userProductsModels.deleteAllProductImages(product_id);
    await userProductsModels.addProductImages(
      product_images.map((item) => [item.product_image, product_id, user_id])
    );
    res.status(200).send({ message: "update product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function addProduct(req, res) {
  try {
    const user_id = req.params.user_id;
    await Product.sync()
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const create_date = new Date().toLocaleDateString("en-US", options);
    const newProduct = await Product.create({...req.body, user_id, create_date})
    // const user_id = req.params.user_id;
    // const {
    //   product_name,
    //   product_price,
    //   product_description,
    //   product_images,
    //   product_type,
    //   user_avatar,
    //   user_name,
    //   product_quantity,
    //   product_condition,
    // } = req.body;
    // const [data] = await userProductsModels.addProduct(
    //   user_id,
    //   product_name,
    //   product_price,
    //   product_description,
    //   product_type,
    //   user_avatar,
    //   user_name,
    //   product_quantity,
    //   product_condition
    // );
    const product_id = newProduct.product_id;
    const array_product_images = req.body.product_images.map((item) => [
      item.product_image,
      product_id,
      user_id,
    ]);
    await userProductsModels.addProductImages(array_product_images);
    res.status(200).send({ message: "add product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product_id = req.params.product_id;
    await userProductsModels.deleteProduct(product_id);
    res.status(200).send({ message: "delete product success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const { type, sort_price, product_condition, page, user_id } = req.query;
    const data = await userProductsModels.getAllProduct(
      Number(type),
      sort_price,
      product_condition,
      15,
      Number(page)
    );
    const products = await getImages(data.products);
    if (user_id) {
      const cartList = await userCartModel.getUserCartList(user_id);
    }

    const total_product = data.total_product;
    const product_per_page = 15;
    const page_number = Math.ceil(total_product / product_per_page);

    res.status(200).send({
      products: products,
      total_product,
      product_per_page,
      page_number,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  deleteProduct,
  addProduct,
  getUserProducts,
  updateUserProduct,
  connectionDatabase
};
