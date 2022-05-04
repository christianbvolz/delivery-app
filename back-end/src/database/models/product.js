const buildModelProduct = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'product',
      timestamps: false,
    });
  
    return Product;
  };
  module.exports = buildModelProduct;