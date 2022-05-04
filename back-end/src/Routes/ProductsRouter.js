const { Router } = require('express');
const ProductsController = require('../Controllers/ProductsController');

const route = Router();

route.get('/products', ProductsController.getProducts);

module.exports = route;