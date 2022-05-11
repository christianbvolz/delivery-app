const UserService = require('../Services/UserService');
const { generateToken } = require('../Token');

const getLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  const responseUser = await UserService.getLogin(email, password);
  
  if (!responseUser) return next({ error: 404, message: 'User does not exist' });

  if (responseUser.error) return next({ error: responseUser.error, message: responseUser.message });

  const { id, email: userEmail } = responseUser;

  const token = generateToken({ id, userEmail });
  const objLocalStorage = {
    name: responseUser.name,
    email: responseUser.email,
    role: responseUser.role,
    token,
  };
  return res.status(200).json(objLocalStorage);
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  const createdUser = await UserService.createUser(name, email, password);

  if (!createdUser) return next({ error: 409, message: 'User already exists.' });

  const { id } = createdUser;

  const token = generateToken({ id, email });

  return res.status(201).json({ token, user: createdUser });
};

module.exports = {
  getLogin,
  register,
};
