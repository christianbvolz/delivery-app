const cors = require('cors');
const express = require('express');

const UserRouter = require('../Routes/UserRouter');
const ProductsRouter = require('../Routes/ProductsRouter');
const SalesProductsRouter = require('../Routes/SalesProductsRouter');
const SalesRouter = require('../Routes/SalesRouter');

const MiddlewareError = require('../Middlewares/MiddlewareError');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public'));

app.use('/', UserRouter);
app.use('/', ProductsRouter);
app.use('/order', SalesProductsRouter);
app.use('/products', ProductsRouter);
app.use('/orders', SalesRouter);
app.use(MiddlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

// const path = require('path');
// path.resolve('front-end','build') => partindo da pasta raiz (Aonde node é chamado), sobe para front-end depois sobe para build
// path.resolve('..') => partindo da pasta raiz, volta uma pasta.
// https://nodejs.org/api/path.html#pathresolvepaths 