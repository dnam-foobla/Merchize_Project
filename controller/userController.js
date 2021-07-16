const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

module.exports.signUp = async (req, res) => {
    const { name, user, password } = req.body;
    console.log(password);
    bcrypt.hash(password, 10, async (err, hash) => {
      console.log(hash, password);
        const newUser = new User({
          name: name,
          user: user,
          password: hash,
        });
        const result = await newUser.save()
        .catch(err => res.status(400).json({ message: "Do not create account, please try again" }));
        const token = jwt.sign(
          {
              data: {
                  user: user
              }
          },
          process.env.SECRET_KEY,
          {expiresIn: 60 * 300}
        )
        res.status(200).json({token: token, message: "Create account successfully"})
    });
}
  
module.exports.login = async (req, res) => {
    let {
        user
    } = req.body;

    const token = jwt.sign(
        {
            data: {
                user: user
            }
        },
        process.env.SECRET_KEY,
        {expiresIn: 60 * 300}
    )
    res.status(200).json({token: token});

}

module.exports.getAllUsers = async (req, res) => {
    const result = await User.find();
    res.json(result);
}