import { getCustomRepository } from "typeorm";
import { InvalidArgumentError, UnauthorizedRequestError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

interface IScheduleInfo {
    applicant: string;
    schedule_id: string;
}

class GetScheduleInfoService {
    async execute({ applicant, schedule_id }: IScheduleInfo) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedule = await schedulesRepository.findOne({ id: schedule_id, applicant });

        if(!schedule) {
            throw new InvalidArgumentError("The given schedule id isn't valid!");
        }

        return schedule;
    }
}

export { GetScheduleInfoService };