const User = require("../schema/userSchema");

module.exports.authSignup = async(req, res, next) => {
    let {
        user 
    } = req.body;

    const result = await User.findOne({ user: user })
    if (!result) {
        next();   
    }
    else {
        res.status(403).json({ message: "Account is exist" })
    }
}