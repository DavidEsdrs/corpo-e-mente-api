import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { InvalidArgumentError } from "../errors/HTTPErrors";

interface IScheduleChange {
    applicant: string;
    schedule_id: string;
}

class ChangeScheduleService {
    async execute({ applicant, schedule_id }: IScheduleChange) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedule = await schedulesRepository.findOne({ id: schedule_id, applicant });

        if(!schedule) {
            throw new InvalidArgumentError("The given schedule id isn't valid!");
        }

        await schedulesRepository.update(schedule.id, { situation: "cancelled" });

        return schedule;
    }
}

export { ChangeScheduleService };