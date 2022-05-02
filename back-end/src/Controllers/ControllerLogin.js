const service = require('../Services/ServiceLogin');
const { generateToken } = require('../Token');

const getLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('cheguei no controller uhul!')
  
  const responseUser = await service.getLogin(email, password);
  
  if (!responseUser) {
    return next({ error: 400, message: 'User does not exist' });
  }

  const { dataValues: { id, email: userEmail } } = responseUser;
  const token = generateToken({ id, userEmail });

  return res.status(200).json({ token });
};

module.exports = {
  getLogin,
};
