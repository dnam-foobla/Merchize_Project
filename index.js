const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./router/userRouter');
const userController = require('./controller/userController')
const { authSignup } = require('./middleware/authSignup');
const { authLogin } = require('./middleware/authLogin');
const { authorUser } = require('./middleware/authorUser');
const { authAdmin } = require('./middleware/authAdmin');
const productRouter = require('./router/productRouter');
const adminRouter = require('./router/adminRouter');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', authSignup, userController.signUp);
app.post('/login', authLogin, userController.login);
app.use('/user', authorUser, userRouter);
app.use('/product', productRouter);
app.use('/admin', authorUser, authAdmin, adminRouter);

app.listen(process.env.PORT, () => {
    console.log("Connect to server successfully...")
})