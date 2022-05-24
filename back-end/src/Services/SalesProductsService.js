const { SaleProduct } = require('../database/models');

const create = async ({ saleId, productId, quantity }) => {
   await SaleProduct.create({ saleId, productId, quantity });
};

module.exports = {
  create,
};