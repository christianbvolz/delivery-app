const buildModelSale = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAdress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      status: { type: DataTypes.STRING, defaultValue: 'Pendente' },
    }, {
      sequelize,
      tableName: 'sales',
      timestamps: false,
    });
  
    return Sale;
  };
  module.exports = buildModelSale;