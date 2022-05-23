const { Sale, Product } = require('../database/models');

const create = async ({ UserId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { dataValues: { id: saleId } } = await
    Sale.create({
      UserId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    });

  return saleId;
};

const getAll = async (userId) => {
  const dataValues = await Sale.findAll({
    where: {
      userId,
    },
  });
  
  return dataValues;
};

const getSale = async (id) => {
  const dataValues = await Sale.findOne({
    where: {
      id,
    },
    include: [{ model: Product, as: 'products' }],
  });
  console.log(dataValues);
  return dataValues;
};

const updateStatus = async (id) => {
  const dataValues = await Sale.update({ status: 'entregue' }, { where: { id } });
  
  return dataValues;
};

module.exports = {
  create,
  getAll,
  getSale,
  updateStatus,
};