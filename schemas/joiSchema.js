import Joi from "joi";


export const upsertJoiSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'name must be typed in string',
        'string.min': 'name must have minimum length of 3',
        'string.max': 'name must have maximum length of 20 ',
        'any.required': 'name is required',
    }),
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).required().messages({
        'string.base': 'phoneNumber must be typed in string',
        'string.pattern.base': `phoneNumber must have 10 digits.`,
       'any.required': 'phoneNumber is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'email address is not valid btw',
    }).default(null),
    contactType: Joi.valid('work', 'home', 'personal').default('personal')
})

export const patchJoiSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be string',
        'string.min': 'name must have minimum length of 3',
        'string.max': 'name must have maximum length of 20 ',
    }).required(),
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({
            'string.base': 'phoneNumber must be typed in string',
        'string.pattern.base': `phoneNumber must have 10 digits.`,
    }),
        email: Joi.string().email().messages({
        'string.email': 'email address is not valid btw',
        }).default(null),
            contactType: Joi.valid('work', 'home', 'personal').messages({
        'any.only': 'type work home or personal bro'
    })
})
