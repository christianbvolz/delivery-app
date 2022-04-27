const buildModelSalesProducts = (sequelize, _DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SalesProducts',
    timestamps: false,
  });

  SalesProducts.associate = (models) => {
    // Sales -> Products
    models.Sales.belongsToMany(models.Product, {
      through: SalesProducts,
      foreignKey: 'productId',
      other: 'id',
    });

    // Products -> Sales
    models.Product.belongsToMany(models.Sales, {
      through: SalesProducts,
      foreignKey: 'saleId',
      other: 'id',
    });
  };

  return SalesProducts;
};
module.exports = buildModelSalesProducts;