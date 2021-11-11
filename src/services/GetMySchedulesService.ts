import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { fixedScheduleObject } from "../utils/transformScheduleObject";

class GetMySchedulesService {
    async execute(user_id: string) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const mySchedules = await schedulesRepository.find({ applicant: user_id });

        return classToPlain(mySchedules);
    }
}

export { GetMySchedulesService };