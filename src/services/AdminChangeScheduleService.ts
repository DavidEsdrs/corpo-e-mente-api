import { getCustomRepository } from "typeorm";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { isValidSituationState } from "../utils/isValidSituationState";

interface IScheduleChange {
    schedule_id: string;
    situation: string;
}

class AdminChangeScheduleService {
    async execute({ schedule_id, situation }: IScheduleChange) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedule = await schedulesRepository.findScheduleById(schedule_id);

        if(!schedule) {
            throw new InvalidArgumentError("The given schedule id doesn't exist!");
        }

        if(!isValidSituationState(situation)) {
            throw new InvalidArgumentError("The given situation state isn't valid!");
        }

        await schedulesRepository.update(schedule_id, { situation });

        return { 
            ...schedule,
            situation 
        };
    }
}

export { AdminChangeScheduleService };