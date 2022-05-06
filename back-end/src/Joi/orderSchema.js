const Joi = require('joi');

const orderSchema = Joi.object({
  authorization: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),

  order: Joi.array().items(Joi.object({
    id: Joi.number().positive().integer().required(),
    quantity: Joi.number().positive().integer().required(),
  })).min(1).required()
  .messages({
    'string.base': 'Order must be an array',
    'any.required': 'Order is required',
  }),

  totalPrice: Joi.number().positive().required(),

  deliveryAdress: Joi.string().required().messages({
    'string.base': 'DeliveryAdress must be a string',
    'any.required': 'DeliveryAdress is required',
  }),

  deliveryNumber: Joi.string().required().messages({
    'string.base': 'DeliveryNumber must be a string',
    'any.required': 'DeliveryNumber is required',
  }),
});

module.exports = orderSchema;