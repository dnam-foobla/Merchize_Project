const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Product = require("../schema/productSchema");
const mongoose = require("../connection");
require("dotenv").config();

module.exports.signUp = async (req, res) => {
  const { name, user, password } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    console.log(hash, password);
    const newUser = new User({
      name: name,
      user: user,
      password: hash,
      isAdmin: 0,
    });
    const result = await newUser
      .save()
      .catch((err) =>
        res
          .status(400)
          .json({ message: "Do not create account, please try again" })
      );
    const token = jwt.sign(
      {
        data: {
          _id: result._id,
          user: user,
          isAdmin: 0,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 300 }
    );
    res
      .status(200)
      .json({ token: token, message: "Create account successfully" });
  });
};

module.exports.login = async (req, res) => {
  let { user, isAdmin, _id } = req.body;
  const token = jwt.sign(
    {
      data: {
        _id: _id,
        user: user,
        isAdmin: isAdmin,
      },
    },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 300 }
  );
  res.status(200).json({ token: token });
};

module.exports.getInfo = async (req, res) => {
  const { user } = req.body;
  const result = await User.findOne({ user: user }).catch((err) =>
    res.status(400).json({ message: "Please try again" })
  );
  res.status(200).json(result);
};

module.exports.getCart = async (req, res) => {
  let { user, _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Can not find that id");
  }

  try {
    let results = [];
    let userCart = await User.findById(_id).exec();
    console.log(userCart);
    userCart = userCart.carts;
    console.log(userCart);
    for (let product of userCart) {
      let productElement = await Product.findById(product).exec();
      results.push(productElement);
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: "Can not view cart" });
  }
};

module.exports.postCart = async (req, res) => {
  let { user, product_id, _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(404).send("Can not find that id");
  }

  let product = await Product.findById(product_id).exec();

  if (product && product.inventory >= 1) {
    product.inventory = product.inventory - 1;
    try {
      // Update product with product_id
      await Product.findByIdAndUpdate(product_id, product);

      //   Add product_id into user
      await User.findOneAndUpdate(
        { user: user },
        { $push: { carts: product_id } }
      );
      res.status(200).json({ message: "Add to cart successfully" });
    } catch (err) {
      res.status(400).json({ message: "Can not add to cart" });
    }
  } else {
    res.status(200).json({ message: "Out of stock" });
  }
};

module.exports.putCart = async (req, res) => {};

module.exports.deleteCart = async (req, res) => {};

module.exports.getOrder = async (req, res) => {
  let { user, _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Can not find that id");
  }

  try {
    let results = [];
    let userProducts = await User.findById(_id).exec();
    console.log(userProducts);
    userProducts = userProducts.products;
    console.log(userProducts);
    for (let product of userProducts) {
      let productElement = await Product.findById(product).exec();
      results.push(productElement);
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: "Can not view cart" });
  }
};

module.exports.postOrder = async (req, res) => {
  let { user, product_id, _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(404).send("Can not find that id");
  }

  let product = await Product.findById(product_id).exec();

  product.users.push(_id);
  try {
    // Update product with product_id
    await Product.findByIdAndUpdate(product_id, product);

    //   Add product_id into user
    let user = await User.findOneAndUpdate(
      { _id: _id },
      { $push: { products: product_id } }
    );
    console.log(user);
    user.carts = [];
    await user.save();
    res.status(200).json({ message: "Order successfully" });
  } catch (err) {
    res.status(400).json({ message: "Can not order" });
  }
};
