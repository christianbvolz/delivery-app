const service = require('../Services/ServiceLogin');
const { generateToken } = require('../Token');

const getLogin = async (req, res, next) => {
  const { email } = req.body;
  const responseUser = await service.getLogin(email);
  
  if (!responseUser) {
    return next({ error: 400, message: 'User does not exist' });
  }

  const { dataValues: { id, email: userEmail } } = responseUser;
  const webToken = generateToken({ id, userEmail });

  return res.status(200).json(webToken);
};

module.exports = {
  getLogin,
};
