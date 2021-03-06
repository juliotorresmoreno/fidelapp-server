
import { Response } from "express";

export const paginator = (res: Response, collection: string, skip: number, take: number) => ([data, total]) => {
    let rest = skip + take;
    rest = rest > total ? total : rest;
    res
        .setHeader('Content-Range', `${collection} ${skip}-${rest}/${total}`)
        .setHeader('Access-Control-Expose-Headers', 'Content-Range')
        .json(data);
}
