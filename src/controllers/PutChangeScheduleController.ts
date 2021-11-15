import { Request, Response } from "express";
import { ChangeScheduleService } from "../services/ChangeScheduleService";

class ChangeScheduleController {
    async handle(req: Request, res: Response) {
        const { user_id: applicant } =  req;
        const { id: schedule_id } = req.params;

        const changeScheduleService = new ChangeScheduleService();

        const oldSchedule = await changeScheduleService.execute({ applicant, schedule_id });

        return res.json(oldSchedule);
    }
}

export { ChangeScheduleController };