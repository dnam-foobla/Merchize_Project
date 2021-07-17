const { Router } = require('express');

const productController = require('../controller/productController');
const { authAdmin } = require('../middleware/authAdmin');
const { authorUser } = require('../middleware/authorUser');

const productRouter = new Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.post('/', authorUser, authAdmin, productController.createProduct);
productRouter.put('/:id', authorUser, authAdmin, productController.putProduct);
productRouter.delete('/:id', authorUser, authAdmin, productController.deleteProduct);

module.exports = productRouter;