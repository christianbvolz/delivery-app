const UserService = require('../Services/UserService');
const { generateToken } = require('../Token');
const { verifyToken } = require('../Token');

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

  const { id, role } = createdUser;

  const token = generateToken({ id, email });
  const objLocalStorage = {
    name,
    email,
    role,
    token,
  };

  return res.status(201).json(objLocalStorage);
};

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });

  return res.status(200).json(authorized);
};

const getSellers = async (_req, res) => {
  const sellers = await UserService.getSellers();

  return res.status(200).json(sellers);
};

module.exports = {
  getLogin,
  register,
  getSellers,
  validateUser,
};
