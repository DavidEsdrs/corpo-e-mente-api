import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { Schedule } from "../entities/Schedule";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

export async function transformScheduleObject(schedule: Schedule | any) {
    const usersRepository = getCustomRepository(UsersRepository);

    const schedulesWithUserAsApplicant = {
        ...schedule,
        scheduled_date: new Date(Number(schedule.scheduled_date)),
        applicant: classToPlain(await usersRepository.findOne(schedule.applicant))
    };

    return schedulesWithUserAsApplicant as IFixedSchedule;
}

interface IFixedSchedule {
    id: string;
    applicant: User;
    scheduled_date: Date;
    situation: string;
    created_at: Date;
    updated_at: Date;
}