
import { Request } from "express";
import { Session } from "src/entities/user.entity";

export type RequestWithSession = {
    session: Session;
    token: string;
} & Request;
