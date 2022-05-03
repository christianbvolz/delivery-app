const { Router } = require('express');
const UserController = require('../Controllers/UserController');
const { validationLogin, validationRegister } = require('../Middlewares/Validations');

const route = Router();

route.post('/login', validationLogin, UserController.getLogin);
route.post('/register', validationRegister, UserController.register);

module.exports = route;