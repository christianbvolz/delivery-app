const { Router } = require('express');
const SalesProductsController = require('../Controllers/SalesProductsController');
const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.post('/create', validateOrder, SalesProductsController.create);

module.exports = route;