const { Sale } = require('../database/models');

const create = async ({ userId, totalPrice, deliveryAdress, deliveryNumber }) => {
  const { dataValues: { id: saleId } } = await
    Sale.create({
      userId,
      sellerId: 2,
      totalPrice,
      deliveryAdress,
      deliveryNumber,
    });

  return saleId;
};

module.exports = {
  create,
};