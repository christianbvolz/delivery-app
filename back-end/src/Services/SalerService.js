const { Sale } = require('../database/models');

const getAll = async (id) => {
  const dataValues = await Sale.findAll({
    where: {
      sellerId: id,
    },
  });
  
  return dataValues;
};

module.exports = {
  getAll,
};