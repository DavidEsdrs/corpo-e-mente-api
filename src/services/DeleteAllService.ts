import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class DeleteAllService {
    async execute() {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        await schedulesRepository.clear();
    }
}

export { DeleteAllService };