const UserService = require('../Services/UserService');
const ProductsService = require('../Services/ProductsService');
const SalesService = require('../Services/SalesService');
const SalesProductsService = require('../Services/SalesProductsService');
const { verifyToken } = require('../Token');

const create = async (req, res, next) => { 
  const { authorization } = req.headers;
  const { order, totalPrice, deliveryAdress, deliveryNumber } = req.body;
  
  if (!authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  const existUser = await UserService.findUser(authorized.id);

  if (!existUser) return next({ error: 404, message: 'User not found' });

  const allProductsId = await ProductsService.getProducts();

  const orderVerify = order.every(({ id }) => allProductsId.some((product) => product.id === id));

  if (!orderVerify) return next({ error: 404, message: 'Product not found.' });

  const saleId = await SalesService
    .create({ userId: authorized.id, totalPrice, deliveryAdress, deliveryNumber });
  
  order.forEach(async ({ id: productId, quantity }) => {
    await SalesProductsService.create({ saleId, productId, quantity });
  });
  return res.status(201).json(saleId);
};

module.exports = {
  create,
};
