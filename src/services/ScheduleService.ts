import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { Schedule } from "../entities/Schedule";
import { AlreadyScheduledError, InvalidArgumentError } from "../errors/HTTPErrors";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { isValidDate } from "../utils/isValidDate";
import { isValidSituationState } from "../utils/isValidSituationState";
import { fixedScheduleObject } from "../utils/transformScheduleObject";

type ScheduleSituation = "scheduled" | "concluded" | "cancelled" | "awaiting";

interface IScheduleAppointment {
    applicant: string;
    scheduled_date: number;
    situation: ScheduleSituation;
}

class ScheduleService {
    async execute({ applicant, scheduled_date, situation = "scheduled" }: IScheduleAppointment) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const dateAlreadyScheduled = await schedulesRepository.findOne({ scheduled_date, situation: "scheduled" });

        if(dateAlreadyScheduled) {
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

        return fixedScheduleObject(classToPlain(schedule) as Schedule);
    }
}

export { ScheduleService, ScheduleSituation }