const buildModelSale = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
      },
    }, {
      tableName: 'sales',
      timestamps: false,
      underscored: true,
    });

    Sale.associate = (models) => {
      Sale.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Sale.belongsTo(models.User, { foreignKey: "sellerId", as: "seller"});
    };  
  
    return Sale;
  };
  module.exports = buildModelSale;