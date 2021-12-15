import * as joi from 'joi';

export const signInSchema = joi.object({
    email: joi
        .string()
        .required()
        .error(
            new Error('¡El email no es valido!.'),
        ),
    password: joi
        .string()
        .required()
        .error(
            new Error('¡El password no es valido!.'),
        )
});

export const signUpSchema = joi.object({
    name: joi
        .string()
        .required()
        .error(
            new Error('¡El username no es valido!.'),
        ),
    last_name: joi
        .string()
        .required()
        .error(
            new Error('¡El lastname no es valido!.'),
        ),
    phone: joi
        .string()
        .pattern(/^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/)
        .required()
        .error(
            new Error('¡El phone no es valido!.'),
        ),
    email: joi
        .string()
        .email()
        .required()
        .error(
            new Error('¡El email no es valido!.'),
        ),
    password: joi
        .string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\-@$!%*#?&])[A-Za-z\d\-@$!%*#?&]{8,}$/)
        .error(
            new Error('¡El password no es valido!.'),
        )
});

export const verificationCodechema = joi.object({
    phone: joi
        .string()
        .pattern(/^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/)
        .error(
            new Error('¡El phone no es valido!.'),
        ),
    email: joi
        .string()
        .email()
        .error(
            new Error('¡El email no es valido!.'),
        ),
    code: joi
        .string()
        .required()
        .min(6)
        .max(6)
        .error(
            new Error('¡El code no es valido!.'),
        )
});
