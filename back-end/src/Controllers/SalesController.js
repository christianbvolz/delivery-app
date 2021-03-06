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

  const { sellerId, totalPrice, saleDate, status, seller: { name: sellerName } } = sale;

  const products = sale.products
    .map(({ id, name, price, urlImage, SaleProduct: { quantity } }) => 
  ({ id, name, price, urlImage, quantity }));

  return res.status(200).json({ sellerId, sellerName, totalPrice, saleDate, status, products });
};

const updateStatus = async (req, res, next) => {
  // const { Authorization } = req.headers;
  const { status } = req.body;
  const { id: saleId } = req.params;

  // if (!Authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  // const authorized = verifyToken(Authorization);

  // if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  const saleStatus = await SalesService.updateStatus(+saleId, status);

  if (!saleStatus) return next({ error: 404, message: 'Sale not Found' });

  return res.status(201).json(saleStatus);
};

module.exports = {
  getAll,
  getSale,
  updateStatus,
};