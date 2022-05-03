const LoginSchema = require('../Joi/LoginSchema');
const RegisterSchema = require('../Joi/RegisterSchema');
const statusError = require('../Joi/StatusError');

const validationLogin = (req, _res, next) => {  
  const { error } = LoginSchema.validate(req.body);
  if (error !== undefined) {
    const erroStatus = statusError(error.details[0].type);
    const middlewareError = { error: erroStatus, message: error.details[0].message };

    return next(middlewareError);
  }
  next();
};

const validationRegister = (req, _res, next) => {  
  const { error } = RegisterSchema.validate(req.body);
  if (error !== undefined) {
    const erroStatus = statusError(error.details[0].type);
    const middlewareError = { error: erroStatus, message: error.details[0].message };

    return next(middlewareError);
  }
  next();
};

module.exports = {
  validationLogin,
  validationRegister,
};