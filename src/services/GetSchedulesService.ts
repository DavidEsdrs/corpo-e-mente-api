import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { SchedulesRepository } from "../repositories/SchedulesRepository";
import { fixedScheduleObject } from "../utils/transformScheduleObject";

class GetSchedulesService {
    async execute() {
        const schedulesRepository = getCustomRepository(SchedulesRepository);
        const appointments = await schedulesRepository.find();
        
        const newAppointmentObject = await Promise.all(appointments.map(fixedScheduleObject));

        return newAppointmentObject as IFixedSchedule[];
    }
}

interface IFixedSchedule {
    id: string;
    applicant: User;
    scheduled_date: Date;
    situation: string;
    created_at: Date;
    updated_at: Date;
}

export { GetSchedulesService };