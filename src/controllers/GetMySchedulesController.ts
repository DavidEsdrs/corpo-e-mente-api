import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { SearchScheduleService } from "../services/SearchSchedulesService";

class GetMySchedulesController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;

        const searchScheduleService = new SearchScheduleService();

        const mySchedules = classToPlain(await searchScheduleService.execute({ applicant: user_id, requestApplicant: user_id }));

        return res.json(mySchedules);
    }
}

export { GetMySchedulesController };