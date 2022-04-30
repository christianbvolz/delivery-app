const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Username must be a string',
    'any.required': 'Username is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 5 characters',
    'any.required': 'Password is required',
  }),
});

module.exports = schema;