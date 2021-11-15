import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { SearchScheduleService } from "../services/SearchSchedulesService";

class SearchScheduleController {
    async handle(req: Request, res: Response) {
        const { id, applicant, scheduled_date, situation } = req.body;
        const { user_id: requestApplicant } = req;

        const service = new SearchScheduleService();

        const schedules = classToPlain(await service.execute({ id, applicant, scheduled_date, situation, requestApplicant }));

        return res.json(schedules);
    }
}

export { SearchScheduleController }