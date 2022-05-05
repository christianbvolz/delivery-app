const cors = require('cors');
const express = require('express');

const UserRouter = require('../Routes/UserRouter');
const customer = require('../Routes/ProductsRouter');

const MiddlewareError = require('../Middlewares/MiddlewareError');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', UserRouter);
app.use('/products', customer);
app.use(MiddlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
