const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

module.exports.signUp = async (req, res) => {
    const { name, user, password } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
      console.log(hash, password);
        const newUser = new User({
            name: name,
            user: user,
            password: hash,
            isAdmin: 0
        });
        const result = await newUser.save()
        .catch(err => res.status(400).json({ message: "Do not create account, please try again" }));
        const token = jwt.sign(
          {
              data: {
                  user: user,
                  isAdmin: 0
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
        user,
        isAdmin
    } = req.body;
    const token = jwt.sign(
        {
            data: {
                user: user,
                isAdmin: isAdmin
            }
        },
        process.env.SECRET_KEY,
        {expiresIn: 60 * 300}
    )
    res.status(200).json({token: token});

}

