const { Router } = require('express');

const userController = require('../controller/userController');
const { authLogin } = require('../middleware/authLogin');
const { authorUser } = require('../middleware/authorUser');
const { authSignup } = require('../middleware/authSignup');

const userRouter = new Router();



module.exports = userRouter;