import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { UnauthorizedRequestError } from "../errors/HTTPErrors";

interface IPayload {
    sub: string;
}

export function ensureAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    
    if(!authToken) {
        throw new UnauthorizedRequestError();
    }

    const [ , token ] = authToken.split(' ');

    try {
        const { sub: subscriber } = verify(token, "44707b60c67b799cd6eaa0d425c2e45d") as IPayload;

        req.user_id = subscriber;

        return next();
    } 
    
    catch(err) {
        return res.status(401).end();
    }
}