import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class GetSchedulesService {
    async execute() {
        const schedulesRepository = getCustomRepository(SchedulesRepository);
        const appointments = await schedulesRepository.find({ 
            relations: [
                "relatedApplicant"
            ]
        });
        
        return classToPlain(appointments);
    }
}

export { GetSchedulesService };