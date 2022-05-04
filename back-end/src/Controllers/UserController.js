const UserService = require('../Services/UserService');
const { generateToken } = require('../Token');

const getLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  const responseUser = await UserService.getLogin(email, password);
  
  if (!responseUser) return next({ error: 400, message: 'User does not exist' });

  if (responseUser.error) return next({ error: responseUser.error, message: responseUser.message })

  const { id, email: userEmail } = responseUser;

  const token = generateToken({ id, userEmail });
  return res.status(200).json({ token });
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  const createdUser = await UserService.createUser(name, email, password);

  if (!createdUser) return next({ error: 409, message: 'Usuario já cadastrado.' });

  const { id } = createdUser;
  const token = generateToken({ id, email });

  return res.status(201).json({ token });
};

module.exports = {
  getLogin,
  register,
};
