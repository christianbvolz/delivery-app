const { User } = require('../database/models');

const getLogin = async (email) => {
  const loginUser = await User.findOne({ where: { email } });

  return loginUser;
};

module.exports = {
  getLogin,
};