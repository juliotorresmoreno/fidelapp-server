
import * as Joi from "joi";

export const subscribeShopSchema = Joi.object({
    shop_id: Joi.number().required()
});

export const addBalanceShopSchema = Joi.object({
    shop_id: Joi.number().required(),
    balance: Joi.number().integer().min(1000).required(),
    client_id: Joi.number().required()
});

export const buyOnShopSchema = Joi.object({
    shop_id: Joi.number().required(),
    product_id: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required()
});
