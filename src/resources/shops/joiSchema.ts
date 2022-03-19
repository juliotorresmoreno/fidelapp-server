import * as Joi from "joi";


export const createSchema = Joi.object({
    identify: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
});

export const updateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
}); 