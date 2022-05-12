const { Sale } = require('../database/models');

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

const getAll = async (id) => {
  const dataValues = await Sale.findAll({
    where: {
      userId: id,
    },
  });
  
  return dataValues;
};

module.exports = {
  create,
  getAll,
};