const User = require('../schema/userSchema');
const mongoose = require("../connection");

module.exports.getAdminInfo = async (req, res) => {
    const result = await User.find({ isAdmin: 1 })
        .catch(err => res.status(400).json({ message: "Please try again" }))
    res.status(200).json(result);
}

module.exports.getInfo = async (req, res) => {
    const {
        user
    } = req.body;
    const result = await User.findOne({ user: user })
        .catch(err => res.status(400).json({ message: "Please try again" }))
    res.status(200).json(result);
}

module.exports.getAllUsers = async (req, res) => {
    const result = await User.find()
        .catch(err => res.status(400).json({ message: "Please try again" }))
    res.status(200).json(result);
}

module.exports.getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Can not find that id");
    }

    const data = await User.findById(id).exec();
    if (!data) {
        res.status(400).json({
            message: "User does not exists"
        })
    }
    else {
        res.status(200).json(data);
    }
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Can not find that id");
    }
    await User.findByIdAndDelete(id)
        .catch((err) => res.sendStatus(400));
    res.status(200).json({message: "Delete Successfully!"})
  };