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

module.exports = {
  create,
};