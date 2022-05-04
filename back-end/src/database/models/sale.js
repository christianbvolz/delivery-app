const buildModelSale = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAdress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'Sales',
      timestamps: false,
    });
  
    return Sale;
  };
  module.exports = buildModelSale;