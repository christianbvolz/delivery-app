const { SaleProduct } = require('../database/models');

const create = async ({ saleId, productId, quantity }) => {
  const sale = 'sale_id';
  const product = 'product_id';
   await SaleProduct.create({ [sale]: saleId, [product]: productId, quantity });
};

module.exports = {
  create,
};