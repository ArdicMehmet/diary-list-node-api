import Joi from 'joi';
export const userInfoValidation = Joi.object({
  age: Joi.number().required().messages({
    'number.base': 'Yaş zorunludur.',
    'number.positive': 'Yaş değeri pozitif olmalıdır.',
    'any.required': 'age adı zorunludur.',
  }),
  currentWeight: Joi.number().required().messages({
    'number.base': 'Ağırlık zorunludur.',
    'number.positive': 'Ağırlık değeri pozitif olmalıdır.',
    'any.required': 'currentWeight adı zorunludur.',
  }),
  deservedWeight: Joi.number().positive().required().messages({
    'number.base': 'İstenilen ağırlık sayı olmalıdır.',
    'number.positive': 'İstenilen ağırlık pozitif olmalıdır.',
    'any.required': 'deservedWeight zorunludur.',
  }),
  height: Joi.number().positive().required().messages({
    'number.base': 'İstenilen boy sayı olmalıdır.',
    'number.positive': 'İstenilen boy pozitif olmalıdır.',
    'any.required': 'height zorunludur.',
  }),
  bloodType: Joi.string().valid('0', 'A', 'B', 'AB').required().messages({
    'string.empty': 'Kan grubu zorunludur.',
    'any.required': 'bloodType adı zorunludur.',
    'any.only': 'Geçersiz kan grubu. Geçerli değerler: 0, A, B, AB.',
  }),
});
