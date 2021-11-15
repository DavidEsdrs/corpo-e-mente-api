import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

interface IScheduleChange {
    schedule_id: string[];
    situation: string;
}

class AdminChangeScheduleService {
    async execute({ schedule_id, situation }: IScheduleChange) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        await schedulesRepository.update(schedule_id, { situation });

        return [
            ...schedule_id
        ];
    }
}

export { AdminChangeScheduleService };