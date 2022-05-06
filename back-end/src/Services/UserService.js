const md5 = require('md5');
const sequelize = require('sequelize');
const { User } = require('../database/models');

const findUser = async (id) => {
  const loginUser = await User.findOne({ where: id });

  if (!loginUser) return undefined;

  return loginUser;
};

const getLogin = async (email, password) => {
  const loginUser = await User.findOne({ where: { email } });

  if (!loginUser) return undefined;

  const hashedPassword = md5(password);
  if (loginUser.password === hashedPassword) return loginUser;

  return { error: 404, message: 'Senha incorreta' };
};

const createUser = async (name, email, password) => {
  const user = await User.findOne({ where: sequelize.or({ name }, { email }) });

  if (user) return undefined;

  const hashedPassword = md5(password);

  const createdUser = await User
  .create({ name, email, password: hashedPassword, role: 'customer' });

  return createdUser;
};

module.exports = {
  getLogin,
  createUser,
  findUser,
};