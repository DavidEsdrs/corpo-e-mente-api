import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

interface ILogin {
    email: string;
    password: string;
}

class LoginService {
    async execute({ email, password }: ILogin) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });

        if(!user) {
            throw new InvalidArgumentError();
        }

        const validArguments = await compare(password, user.password);

        if(!validArguments) {
            throw new InvalidArgumentError();
        }

        const token = sign({ email: user.email }, "44707b60c67b799cd6eaa0d425c2e45d", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { LoginService }