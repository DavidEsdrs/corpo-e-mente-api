import { getCustomRepository } from "typeorm";
import { AlreadyScheduledError, InvalidArgumentError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { isValidDate } from "../utils/isValidDate";
import { isValidSituationState } from "../utils/isValidSituationState";

type ScheduleSituation = "scheduled" | "concluded" | "cancelled" | "awaiting";

interface IScheduleAppointment {
    applicant: string;
    scheduled_date: number;
    situation: ScheduleSituation;
}

class ScheduleService {
    async execute({ applicant, scheduled_date, situation = "scheduled" }: IScheduleAppointment) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const dateAlreadyAgended = await schedulesRepository.findOne({ scheduled_date, situation: "scheduled" });

        if(dateAlreadyAgended) {
            throw new AlreadyScheduledError();
        }

        if(!isValidSituationState(situation)) {
            throw new InvalidArgumentError("The given situation state isn't valid!");
        }

        if(!isValidDate(scheduled_date)) {
            throw new InvalidArgumentError("Either the given date or hour isn't available!");
        }

        const schedule = schedulesRepository.create({ applicant, scheduled_date, situation });

        await schedulesRepository.save(schedule);

        return schedule;
    }
}

export { ScheduleService, ScheduleSituation }