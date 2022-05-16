const { Router } = require('express');
const SalesController = require('../Controllers/SalesController');
// const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.get('/:id', SalesController.getSale);
route.post('/:id', SalesController.updateStatus);
route.get('/', SalesController.getAll);

module.exports = route;