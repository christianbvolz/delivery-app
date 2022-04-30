const LoginSchema = require('../Joi/LoginSchema');
const statusError = require('../Joi/StatusError');

const validationUser = (req, _res, next) => {  
  const { error } = LoginSchema.validate(req.body);
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