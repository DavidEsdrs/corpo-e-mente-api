import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UnauthorizedRequestError } from "../errors/HTTPErrors";
import { UsersRepository } from "../repositories/UsersRepository";

// Verificar se o usuário é um admin
export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req;

    const userRepository = getCustomRepository(UsersRepository);

    const { admin } = await userRepository.findOne(user_id);

    if(admin) {
        return next();
    }

    throw new UnauthorizedRequestError();
}