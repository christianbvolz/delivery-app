const md5 = require('md5');
const sequelize = require('sequelize');
const { User } = require('../database/models');

const createUser = async (name, email, password) => {
  const user = await User.findOne({
    where: sequelize.or({ name }, { email })
  });

  if (user) return undefined;

  const hashedPassword = md5(password);

  const createdUser = await User.create({ name, email, password: hashedPassword });

  return createdUser;
};

module.exports = {
  createUser,
};