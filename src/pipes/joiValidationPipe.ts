import {
    PipeTransform,
    Injectable,
    // ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

type TransformValues = string | number | boolean;

/**
 * Custom pipe for Joi validate schemas
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: TransformValues) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException(
                error.message ? `${error.message}` : `Validation failed`,
            );
        }
        return value;
    }
}
