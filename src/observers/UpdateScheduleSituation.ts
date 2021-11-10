import { getCustomRepository, LessThan } from "typeorm";
import { Schedule } from "../entities/Schedule";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

async function deleteCancelledAppointments() {
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    await schedulesRepository.delete({ situation: "cancelled" });
}

async function updateSchedulesSituation() {
    const schedulesRepository = getCustomRepository(SchedulesRepository);
    
    await schedulesRepository.update(
        {
            situation: "scheduled",
            scheduled_date: LessThan(new Date())
        },
        {
            situation: "awaiting"
        }
    )
}
    
async function updateScheduleToConcluded() {
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    const oneDay = 86400000;

    await schedulesRepository.createQueryBuilder().
        update(Schedule).
        set({ situation: "concluded" }).
        where("situation = :awaiting AND scheduled_date < :threeDaysFromNow", {
            awaiting: "awaiting",
            threeDaysFromNow: Date.now() + oneDay * 3
        }).
        execute();
}

export { deleteCancelledAppointments, updateScheduleToConcluded, updateSchedulesSituation };