
import * as Joi from 'joi';
import { phoneValidation } from 'src/utils/joiValidations';

export const phoneSignInSchema = Joi.object({
    phone: Joi
        .string()
        .required()
        .custom(phoneValidation)
});

export const signInSchema = Joi.object({
    email: Joi.string().required().error(new Error('¡El email no es valido!.')),
    password: Joi
        .string()
        .required()
        .error(new Error('¡El password no es valido!.')),
});

export const signUpSchema = Joi.object({
    name: Joi.string().required().error(new Error('¡El username no es valido!.')),
    last_name: Joi
        .string()
        .required()
        .error(new Error('¡El lastname no es valido!.')),
    phone: Joi
        .string()
        .pattern(
            /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/,
        )
        .required()
        .error(new Error('¡El phone no es valido!.')),
    email: Joi
        .string()
        .email()
        .required()
        .error(new Error('¡El email no es valido!.')),
    password: Joi
        .string()
        .required()
        .pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\-@$!%*#?&])[A-Za-z\d\-@$!%*#?&]{8,}$/,
        )
        .error(new Error('¡El password no es valido!.')),
});

export const verificationCodechema = Joi.object({
    phone: Joi
        .string()
        .pattern(
            /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/,
        )
        .error(new Error('¡El phone no es valido!.')),
    email: Joi.string().email().error(new Error('¡El email no es valido!.')),
    code: Joi
        .string()
        .required()
        .min(6)
        .max(6)
        .error(new Error('¡El code no es valido!.')),
});
