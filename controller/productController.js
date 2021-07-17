const Product = require('../schema/productSchema');
const mongoose = require("../connection");
const { json } = require('body-parser');

// Done
module.exports.createProduct = async (req, res) => {
    const { name, amount, inventory } = req.body;
    // Create instance, object --> document
    const product = new Product({
      name: name,
      amount: amount,
      inventory: inventory,
    });
    await product
      .save()
        .catch((err) => res.sendStatus(400));
    res.status(200).json({ message: "Create product sucessfully" });
};
  
module.exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
        .catch(err => res.status(400).json({ message: "Something is wrong, please try again!" }))
    res.json(products);
}

module.exports.getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Can not find that id");
    }

    const data = await Product.findById(id).exec();
    res.status(200).json(data);
}

// Done
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Can not find that id");
    }
    await Product.findByIdAndDelete(id)
        .catch((err) => res.sendStatus(400));
    res.status(200).json({message: "Delete Successfully!"})
  };
  // Done
  module.exports.putProduct = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Can not find that id");
    }
    const newProduct = {
      $set: { ...req.body, _id: id },
    };
    try {
      await Product.findByIdAndUpdate(id, newProduct);
    } catch (err) {
      res.sendStatus(400);
    }
      res.status(200).json({
        message: "Changed product"
    });
  };