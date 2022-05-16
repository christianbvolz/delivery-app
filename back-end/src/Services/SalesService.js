const { Sale, Product } = require('../database/models');

const create = async ({ userId, sellerId, totalPrice, deliveryAdress, deliveryNumber }) => {
  const { dataValues: { id: saleId } } = await
    Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAdress,
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
    include: { model: Product, as: 'products' },
  });
  
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