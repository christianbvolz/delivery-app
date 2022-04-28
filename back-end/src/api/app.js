const express = require('express');

const routerLogin = require('../Routes/Login');
const MiddlewareErro = require('../Middlewares/MiddlewareErro');

const app = express();
app.use(express.json());

app.use('/login', routerLogin);
app.use(MiddlewareErro);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
