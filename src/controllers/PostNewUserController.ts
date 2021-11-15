import { NextFunction, Request, Response } from "express";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { NewAccountService } from "../services/NewAccountService";

interface INewUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class NewAccountController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, admin } = req.body as INewUserRequest;

        if(!name) {
            throw new InvalidArgumentError();
        }

        if(!email) {
            throw new InvalidArgumentError();
        }

        if(!password) {
            throw new InvalidArgumentError();
        }

        const newAccountService = new NewAccountService();

        const user = await newAccountService.execute({ name, email, password, admin });

        return res.json(user);
    }
}

export { NewAccountController };