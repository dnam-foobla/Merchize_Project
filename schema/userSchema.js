const mongoose = require("../connection");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: String,
    user: String,
    password: String,
    products: [ObjectId]
})

const User = mongoose.model('user', userSchema);

module.exports = User;