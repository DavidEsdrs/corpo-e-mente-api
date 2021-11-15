import { NextFunction, Request, Response } from "express";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { LoginService } from "../services/LoginService";

interface ILoginRequest {
    email: string;
    password: string;
}

class LoginController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as ILoginRequest;

        if(!email) {
            throw new InvalidArgumentError();
        }

        if(!password) {
            throw new InvalidArgumentError();
        }

        const loginService = new LoginService();

        const token = await loginService.execute({ email, password });

        return res.json(token);
    }
}

export { LoginController }