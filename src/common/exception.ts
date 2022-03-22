import * as createHttpError from "http-errors";

export class DatabaseException extends createHttpError.InternalServerError {
    constructor(description?: string) {
        super(description);
    }
}
