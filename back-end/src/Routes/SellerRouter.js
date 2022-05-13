const { Router } = require('express');
const SalerController = require('../Controllers/SalerController');
// const { validateOrder } = require('../Middlewares/Validations');

const route = Router();

route.get('/', SalerController.getAll);

module.exports = route;