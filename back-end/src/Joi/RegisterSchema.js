const Joi = require('joi');

const RegisterSchema = Joi.object({
  name: Joi.string().required().max(12).messages({
    'string.base': 'Name must be a string',
    'string.max': 'Name must be less than 12 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 5 characters',
    'any.required': 'Password is required',
  }),
});

module.exports = RegisterSchema;