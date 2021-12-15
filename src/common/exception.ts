import { InternalServerErrorException } from "@nestjs/common";

export class DatabaseException extends InternalServerErrorException {
    constructor(objectOrError?: string | object | any, description?: string) {
        super(objectOrError, description);
    }
}