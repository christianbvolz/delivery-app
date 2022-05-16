const buildModelSalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'salesProducts',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    // Sales -> Products
    models.Sale.belongsToMany(models.Product, {
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'products',
    });

    // Products -> Sales
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'sales',
    });
  };

  return SaleProduct;
};
module.exports = buildModelSalesProducts;