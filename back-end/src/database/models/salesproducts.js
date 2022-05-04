const buildModelSalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
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
      other: 'id',
    });

    // Products -> Sales
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: 'saleId',
      other: 'id',
    });
  };

  return SaleProduct;
};
module.exports = buildModelSalesProducts;