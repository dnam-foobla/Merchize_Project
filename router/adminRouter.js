const { Router } = require('express');

const adminController = require('../controller/adminController');
const { authAdmin } = require('../middleware/authAdmin');
const { authorUser } = require('../middleware/authorUser');

const adminRouter = new Router();

adminRouter.get('/', adminController.getInfo);
adminRouter.get('/all', adminController.getAdminInfo);

adminRouter.get('/user', adminController.getAllUsers);
adminRouter.get('/user/:id', adminController.getUser);
adminRouter.delete('/user/:id', authorUser, authAdmin, adminController.deleteUser);

module.exports = adminRouter;