import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { SearchScheduleService } from "../services/SearchSchedulesService";

class GetSchedulesController {
    async handler(req: Request, res: Response) {
        const { user_id: requestApplicant } = req;

        const searchScheduleService = new SearchScheduleService();

        const appointments = classToPlain(await searchScheduleService.execute({ requestApplicant }));

        return res.json(appointments);
    }
}

export { GetSchedulesController };