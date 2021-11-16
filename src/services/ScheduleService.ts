import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { isValidDate } from "../utils/isValidDate";
import { isValidSituationState } from "../utils/isValidSituationState";

type ScheduleSituation = "scheduled" | "concluded" | "cancelled" | "awaiting";

interface IScheduleAppointment {
    user_id: string;
    scheduled_date: number;
    situation: ScheduleSituation;
}

class ScheduleService {
    async execute({ user_id, scheduled_date, situation = "scheduled" }: IScheduleAppointment) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const dateAlreadyScheduled = await schedulesRepository.findOne({ scheduled_date, situation: "scheduled" });

        if(dateAlreadyScheduled) {
            throw new InvalidArgumentError("The given date is unavailable");
        }

        if(!isValidSituationState(situation)) {
            throw new InvalidArgumentError("The given situation state isn't valid!");
        }

        if(!isValidDate(scheduled_date)) {
            throw new InvalidArgumentError("Either the given date or hour isn't available!");
        }

        const applicant = await getCustomRepository(UsersRepository).findOne(user_id);

        const schedule = schedulesRepository.create({ applicant, scheduled_date, situation });

        await schedulesRepository.save(schedule);

        return classToPlain(schedule);
    }
}

export { ScheduleService, ScheduleSituation }