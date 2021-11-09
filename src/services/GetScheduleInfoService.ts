import { getCustomRepository } from "typeorm";
import { InvalidArgumentError, UnauthorizedRequestError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { isValidApplicant } from "../utils/isValidApplicant";

interface IScheduleInfo {
    applicant: string;
    schedule_id: string;
}

class GetScheduleInfoService {
    async execute({ applicant, schedule_id }: IScheduleInfo) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedule = await schedulesRepository.findOne(schedule_id);

        if(!schedule) {
            throw new InvalidArgumentError("The given schedule id isn't valid!");
        }

        if(!isValidApplicant(schedule.applicant, applicant)) {
            throw new UnauthorizedRequestError();
        }

        return schedule;
    }
}

export { GetScheduleInfoService };