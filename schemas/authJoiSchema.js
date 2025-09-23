import Joi from "joi"

export const authRegisterJoi = Joi.object({
    name: Joi.string().required().message({
        'string.base': 'name must be typed in string',
        'any.required': 'name is required',
    }),
    email: Joi.string().required().message({
        'string.base': 'email must be typed in string',
        'any.required': 'email is required',
    }),
    password: Joi.string().required().message({
        'string.base': 'password must be typed in string',
        'any.required': 'password is required',
    })
})

export const authLoginJoi = Joi.object({
    email: Joi.string().required().message({
      'string.base': 'email must be typed in string',
        'any.required': 'email is required',
    }),
        password: Joi.string().required().message({
        'string.base': 'password must be typed in string',
        'any.required': 'password is required',
    })
})
