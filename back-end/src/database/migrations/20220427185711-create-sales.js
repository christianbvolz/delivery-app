'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      sellerId: {
        field: 'seller_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL(9, 2)
      },
      deliveryAdress: {
        field: 'delivery_address',
        type: Sequelize.STRING
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};