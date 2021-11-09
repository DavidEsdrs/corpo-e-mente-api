import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { InvalidArgumentError, UnauthorizedRequestError } from "../errors/HTTPErrors";
import { isValidApplicant } from "../utils/isValidApplicant";

interface IScheduleChange {
    applicant: string;
    schedule_id: string;
}

class ChangeScheduleService {
    async execute({ applicant, schedule_id }: IScheduleChange) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedule = await schedulesRepository.findOne(schedule_id);

        if(!schedule) {
            throw new InvalidArgumentError("The given schedule id isn't valid!");
        }

        if(!isValidApplicant(schedule.applicant, applicant)) {
            throw new UnauthorizedRequestError();
        }

        await schedulesRepository.update(schedule.id, { situation: "cancelled" });

        return schedule;
    }
}

export { ChangeScheduleService };