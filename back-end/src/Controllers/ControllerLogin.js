const service = require('../Services/ServiceLogin');
const { geraToken } = require('../Token');

const getLogin = async (req, res, next) => {
  const { email } = req.body;
  const responseUser = await service.getLogin(email);
  if (!responseUser) {
    return next({ error: 400, message: 'User does not exist' });
  }
  const { dataValues: { id, email: userEmail } } = responseUser;
  const webToken = geraToken({ id, userEmail });

  return res.status(200).json({ token: webToken });
};

module.exports = {
  getLogin,
};
