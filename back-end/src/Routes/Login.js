const { Router } = require('express');
const Controllers = require('../Controllers/ControllerLogin');
const { validationUser } = require('../Middlewares/Validations');

const route = Router();

route.post('/', validationUser, Controllers.getLogin);

module.exports = route;