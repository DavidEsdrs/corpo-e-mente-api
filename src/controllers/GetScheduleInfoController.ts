import { Request, Response } from "express";
import { SearchScheduleService } from "../services/SearchSchedulesService";

class GetScheduleInfoController {
    async handle(req: Request, res: Response) {
        const { user_id: applicant } = req;
        const { id: schedule_id } = req.params;

        const searchScheduleService = new SearchScheduleService();

        const schedule = await searchScheduleService.execute({ id: schedule_id, applicant, requestApplicant: applicant });

        return res.json(schedule);
    }
}

export { GetScheduleInfoController };