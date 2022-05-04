const ProductsService = require('../Services/ProductsService');

const getProducts = async (_req, res, next) => { 
  const responseProducts = await ProductsService.getProducts();
  
  if (responseProducts.length === 0) {
    return next({ error: 204, message: 'Products does not exist' });
  }

  return res.status(200).json(responseProducts);
};

module.exports = {
  getProducts,
};
