module.exports.authAdmin = async (req, res, next) => {
    if (req.body.isAdmin) {
        console.log("Admin")
        next();
    }
    else {
        res.status(403).json({
            message: "Do not access!"
        })
    }
}