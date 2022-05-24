const { Sale, Product, User } = require('../database/models');

const create = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { dataValues: { id: saleId } } = await
    Sale.create({
      userId,
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
  const [result] = await Sale.findAll({
    where: { id },
    include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }, 
    }, {
        model: User,
        as: 'seller',
        attributes: { exclude: ['password'] },
    }],
});

  return result;
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