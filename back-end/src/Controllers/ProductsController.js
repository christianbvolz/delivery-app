const ProductsService = require('../Services/ProductsService');

const getProducts = async (req, res, next) => { 
  const responseProducts = await ProductsService.getProducts();
  
  if (!responseProducts) return next({ error: 400, message: 'Products does not exist' });

  return res.status(200).json(responseProducts);
};

module.exports = {
  getProducts,
};
