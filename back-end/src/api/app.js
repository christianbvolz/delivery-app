const express = require('express');

const routerLogin = require('../Routes/Login');
const MiddlewareError = require('../Middlewares/MiddlewareError');

const app = express();
app.use(express.json());

app.use('/login', routerLogin);
app.use(MiddlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
