import { Request, Response } from "express";
import { GetScheduleInfoService } from "../services/GetScheduleInfoService";

class GetScheduleInfoController {
    async handle(req: Request, res: Response) {
        const { user_id: applicant } = req;
        const { id: schedule_id } = req.params;

        const getScheduleInfoService = new GetScheduleInfoService();

        const schedule = await getScheduleInfoService.execute({ applicant, schedule_id });

        return res.json(schedule);
    }
}

export { GetScheduleInfoController };