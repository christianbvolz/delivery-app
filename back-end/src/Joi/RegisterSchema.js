const Joi = require('joi');

const RegisterSchema = Joi.object({
  name: Joi.string().required().min(12).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than, or equal to 12 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than, or equal to 6 characters',
    'any.required': 'Password is required',
  }),
});

module.exports = RegisterSchema;