import Joi from 'joi';

export const productValidationWithDate = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Ürün adı zorunludur.',
    'any.required': 'Ürün adı zorunludur.',
  }),
  weight: Joi.number().positive().required().messages({
    'number.base': 'Ağırlık sayı olmalıdır.',
    'number.positive': 'Ağırlık pozitif olmalıdır.',
    'any.required': 'Ağırlık zorunludur.',
  }),
  calories: Joi.number().positive().required().messages({
    'number.base': 'Kalori değeri sayı olmalıdır.',
    'number.positive': 'Kalori pozitif olmalıdır.',
    'any.required': 'Kalori zorunludur.',
  }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Tarih formatı YYYY-MM-DD olmalıdır.',
      'any.required': 'Tarih zorunludur.',
      'string.empty': 'Tarih alanı boş olamaz.',
    }),
});

export const updateProduct = Joi.object({
  _id: Joi.string().length(24).hex().required().messages({
    'string.hex': 'Geçersiz _id formatı.',
    'string.length': 'Geçersiz _id uzunluğu.',
    'any.required': '_id zorunludur.',
  }),
}).concat(productValidationWithDate);
