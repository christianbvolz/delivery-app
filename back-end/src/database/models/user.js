const buildModelUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'Users',
      timestamps: false,
      underscored: true,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Sale, { targetKey: 'userId', as: 'user_id' });
      User.hasMany(models.Sale, { targetKey: 'sellerId', as: 'seller_id' });
      models.Sale.belongsTo(User, { foreignKey: 'userId', as: 'user_id' });
      models.Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'seller_id' });
    };
  
    return User;
  };
  module.exports = buildModelUser;