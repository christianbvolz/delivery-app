const LoginSchema = require('../Joi/LoginSchema');
const RegisterSchema = require('../Joi/RegisterSchema');
const statusError = require('../Joi/StatusError');

const validationType = (body) => {
  if (body.name) return RegisterSchema.validate(body);
  return LoginSchema.validate(body);
};

const validationUser = (req, _res, next) => {  
  const { error } = validationType(req.body);
  if (error !== undefined) {
    const erroStatus = statusError(error.details[0].type);
    const middlewareError = { error: erroStatus, message: error.details[0].message };

    return next(middlewareError);
  }
  next();
};

module.exports = {
  validationUser,
};