const buildModelSalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      field: 'sale_id'
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
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
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      as: 'products',
    });

    // Products -> Sales
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      as: 'sales',
    });
  };

  return SaleProduct;
};
module.exports = buildModelSalesProducts;