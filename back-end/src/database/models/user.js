const buildModelUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'users',
      timestamps: false,
      underscored: true,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Sale, { targetKey: 'user_id' });
      User.hasMany(models.Sale, { targetKey: 'seller_id' });
      models.Sale.belongsTo(User, { foreignKey: 'user_id' });
      models.Sale.belongsTo(User, { foreignKey: 'seller_id' });
    };
  
    return User;
  };
  module.exports = buildModelUser;