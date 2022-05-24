const buildModelProduct = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'products',
      underscored: true,
      timestamps: false,
    });
  
    return Product;
  };
  module.exports = buildModelProduct;