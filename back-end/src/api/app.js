const cors = require('cors');
const express = require('express');

const UserRouter = require('../Routes/UserRouter');
const ProductsRouter = require('../Routes/ProductsRouter');
const SalesProductsRouter = require('../Routes/SalesProductsRouter');

const MiddlewareError = require('../Middlewares/MiddlewareError');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', UserRouter);
app.use('/', ProductsRouter);
app.use('/order', SalesProductsRouter);
app.use('/products', customer);
app.use(MiddlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
