const md5 = require('md5');
const { User } = require('../database/models');

const getLogin = async (email, password) => {
  const loginUser = await User.findOne({ where: { email } });

  if (!loginUser) return undefined;

  const hashedPassword = md5(password);
  if (loginUser.password === hashedPassword) return loginUser;

  return { error: 404, message: 'Senha incorreta' };
};

module.exports = {
  getLogin,
};