'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2)
      },
      deliveryAdress: {
        type: Sequelize.STRING
      },
      deliveryNumber: {
        type: Sequelize.STRING
      },
      saleDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};