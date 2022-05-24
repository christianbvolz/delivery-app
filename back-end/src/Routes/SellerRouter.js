const { Router } = require('express');
const SellerController = require('../Controllers/SellerController');
// const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.get('/', SellerController.getAll);

module.exports = route;