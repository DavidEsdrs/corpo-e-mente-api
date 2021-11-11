import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository"
import { Request, Response } from "express";

class GetAllDatesController {
    async handle(req: Request, res: Response) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const allSchedules = await schedulesRepository.find();

        const allDates = allSchedules.map(x => Number(x.scheduled_date));

        const dateAsDateType = allDates.map(x => new Date(x));

        return res.json(dateAsDateType);
    }
}

export { GetAllDatesController }