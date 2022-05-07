const buildModelProduct = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: {
        type: DataTypes.STRING,
        field: 'url_image'
      },
    }, {
      sequelize,
      tableName: 'products',
      timestamps: false,
    });
  
    return Product;
  };
  module.exports = buildModelProduct;