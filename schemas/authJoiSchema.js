import Joi from "joi"

export const authRegisterJoi = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'name must be typed in string',
        'any.required': 'name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'email must be typed in string',
        'any.required': 'email is required',
    }),
    password: Joi.string().required().messages({
        'string.base': 'password must be typed in string',
        'any.required': 'password is required',
    })
})

export const authLoginJoi = Joi.object({
    email: Joi.string().required().messages({
      'string.base': 'email must be typed in string',
        'any.required': 'email is required',
    }),
        password: Joi.string().required().messages({
        'string.base': 'password must be typed in string',
        'any.required': 'password is required',
    })
})

export const resetAuth = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'email must be string',
        'any.required': 'email is required',
    })
})

export const resetPwd = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
})
