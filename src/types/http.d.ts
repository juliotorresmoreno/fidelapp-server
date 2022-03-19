
import { Request } from "express";
import { User } from "src/entities/user.entity";

export type RequestWithSession = {
    session: User;
    token: string;
} & Request;
