import { Request, Response, NextFunction } from "express";
import { HTTPErrors } from "../errors/HTTPErrors";

function errors(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof HTTPErrors) {
        return res.status(err.status).json({ error: err.message });
    }

    else {
        return res.status(500).json({ status: "Error", message: err.message })
    }
}

export { errors as ErrorsMiddleware };