import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class GetSchedulesService {
    async execute() {
        const schedulesRepository = getCustomRepository(SchedulesRepository);
        const appointments = await schedulesRepository.find();
        return appointments;
    }
}

export { GetSchedulesService };