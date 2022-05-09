const { Router } = require('express');
const SalesProductsController = require('../Controllers/SalesProductsController');
const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.get('/', validateOrder, SalesProductsController.create);

module.exports = route;