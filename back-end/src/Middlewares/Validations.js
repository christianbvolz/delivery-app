const validationUser = (req, _res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return next({ error: 400, message: '"email" or "password" is not allowed to be empty' });
  }
    if (!email || !password) {
    return next({ error: 400, message: '"email" or "password" is required' });
  }
};

module.exports = {
  validationUser,
};