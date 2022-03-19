
import phone from 'phone';

export const phoneValidation = (value: string) => {
    const validation = phone(value);
    if (!validation.isValid)
        throw new Error('¡El phone no es valido!.');
    return value.replace(/\s+/g, '');
};
