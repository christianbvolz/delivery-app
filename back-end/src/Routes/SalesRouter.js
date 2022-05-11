const { Router } = require('express');
const SalesController = require('../Controllers/SalesController');
// const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.get('/', SalesController.getAll);

module.exports = route;