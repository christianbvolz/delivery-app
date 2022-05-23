const SalesService = require('../Services/SalesService');
const { verifyToken } = require('../Token');

const getAll = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  const data = await SalesService.getAll(authorized.id);

  return res.status(200).json(data);
};

const getSale = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id: saleId } = req.params;
  
  if (!authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  const sale = await SalesService.getSale(+saleId);

  if (!sale) return next({ error: 404, message: 'Sale not Found' });

  const { sellerId, totalPrice, saleDate, status } = sale;

  // const products = sale.products
  //   .map(({ id, name, price, urlImage, SaleProduct: { quantity } }) => 
  // ({ id, name, price, urlImage, quantity }));

  const { products } = sale;
  return res.status(200).json({ sellerId, totalPrice, saleDate, status, products });
};

const updateStatus = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id: saleId } = req.params;

  if (!authorization) return next({ error: 401, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  const saleStatus = await SalesService.updateStatus(+saleId);

  if (!saleStatus) return next({ error: 404, message: 'Sale not Found' });

  return res.status(201).json(saleStatus);
};

module.exports = {
  getAll,
  getSale,
  updateStatus,
};