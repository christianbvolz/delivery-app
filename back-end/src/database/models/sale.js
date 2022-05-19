const buildModelSale = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
      },
      sellerId: {
        type: DataTypes.INTEGER,
        field: 'seller_id'
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        field: 'total_price'
      },
      deliveryAdress: {
        type: DataTypes.STRING,
        field: 'delivery_address'
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        field: 'delivery_number'
      },
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'sale_date'
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
      },
    }, {
      sequelize,
      tableName: 'sales',
      timestamps: false,
    });
  
    return Sale;
  };
  module.exports = buildModelSale;