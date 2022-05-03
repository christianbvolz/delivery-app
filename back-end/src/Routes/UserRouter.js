const { Router } = require('express');
const UserController = require('../Controllers/UserController');
const { validationUser } = require('../Middlewares/Validations');

const route = Router();

route.post('/login', validationUser, UserController.getLogin);
route.post('/register', validationUser, UserController.register);

module.exports = route;