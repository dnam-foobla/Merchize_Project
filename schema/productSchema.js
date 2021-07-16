const mongoose = require('../connection')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: String,
    amount: Number,
    inventory: Number,
    users: [ObjectId]
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;