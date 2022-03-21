import * as Joi from "joi";


export const createShopSchema = Joi.object({
    identify: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
});

export const updateShopSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
}); 