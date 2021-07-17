const { Router } = require("express");

const userController = require("../controller/userController");

const userRouter = new Router();

userRouter.get("/", userController.getInfo);
userRouter.get("/cart", userController.getCart);
userRouter.post("/cart", userController.postCart);

userRouter.get("/order", userController.getOrder);
userRouter.post("/order", userController.postOrder);

module.exports = userRouter;
