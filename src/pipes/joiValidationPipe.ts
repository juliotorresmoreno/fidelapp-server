import {
    PipeTransform,
    Injectable
} from '@nestjs/common';
import * as createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

type TransformValues = string | number | boolean;

/**
 * Custom pipe for Joi validate schemas
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: TransformValues) {
        if (typeof value !== 'object') return value;
        
        const { error } = this.schema.validate(value);
        if (error) {
            throw new createHttpError.BadRequest(
                error.message ? `${error.message}` : `Validation failed`,
            );
        }
        return value;
    }
}
