const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");

module.exports.authLogin = async (req, res, next) => {
  let { user, password } = req.body;
  const result = await User.findOne({ user: user });
  console.log(result);
  if (!result) {
    res.status(403).json({ message: "You can create account before login" });
  } else {
    bcrypt.compare(password, result.password, (err, isMatch) => {
      if (isMatch) {
        req.body.isAdmin = result.isAdmin;
        req.body._id = result._id;
        next();
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    });
  }
};
