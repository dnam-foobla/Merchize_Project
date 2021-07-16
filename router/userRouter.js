const { Router } = require('express');

const userController = require('../controller/userController');
const { authLogin } = require('../middleware/authLogin');
const { authSignup } = require('../middleware/authSignup');

const userRouter = new Router();

userRouter.post('/signup', authSignup, userController.signUp)
userRouter.post('/login', authLogin, userController.login)

userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;