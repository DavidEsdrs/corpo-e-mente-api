import { NextFunction, Request, Response } from "express";
import { NullEmailError, NullPasswordError } from "../errors/HTTPErrors";
import { LoginService } from "../services/LoginService";

interface ILoginRequest {
    email: string;
    password: string;
}

class LoginController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as ILoginRequest;

        if(!email) {
            throw new NullEmailError();
        }

        if(!password) {
            throw new NullPasswordError();
        }

        const loginService = new LoginService();

        const token = await loginService.execute({ email, password });

        return res.json(token);
    }
}

export { LoginController }