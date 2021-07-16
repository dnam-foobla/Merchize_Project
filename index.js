const express = require('express');
const bodyParser = require('body-parser');

const User = require('./schema/userSchema');
const userRouter = require('./router/userRouter');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log("Connect to server successfully...")
})