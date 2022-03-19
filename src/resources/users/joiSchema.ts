import * as Joi from 'joi';

const customJoi = Joi.extend(require('joi-phone-number'));

export const updateProfileSchema = Joi.object({
    name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    photo: Joi.string(),
    rol: Joi.string().valid('seller', 'client')
});
