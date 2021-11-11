import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { EmailAlreadyExistsError } from "../errors/HTTPErrors";
import { UsersRepository } from "../repositories/UsersRepository";

interface INewUser {
    name: string;
    email: string;
    password: string;
    admin: boolean;
}

class NewAccountService {
    async execute({ name, email, password, admin = false }: INewUser) {
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(userAlreadyExists) {
            throw new EmailAlreadyExistsError();
        }

        const encryptedPassword = await hash(password, 8);

        const user = usersRepository.create({ name, email, password: encryptedPassword, admin });

        await usersRepository.save(user);

        return classToPlain(user);
    }
}

export { NewAccountService }