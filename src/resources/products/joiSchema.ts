import * as Joi from "joi";

export const createProductSchema = Joi.object({
    sku: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    shop_id: Joi.number().required(),
    price: Joi.number().required()
});

export const updateProductSchema = Joi.object({
    sku: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number()
}); 
