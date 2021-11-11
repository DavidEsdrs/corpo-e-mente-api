import { Request, Response } from "express";
import { AdminChangeScheduleService } from "../services/AdminChangeScheduleService";

class AdminChangeScheduleController {
    async handle(req: Request, res: Response) {
        const { schedule_id, situation } = req.body;

        const adminChangeScheduleService = new AdminChangeScheduleService();

        const newSchedule = await adminChangeScheduleService.execute({ schedule_id, situation });

        return res.json(newSchedule);
    }
}

export { AdminChangeScheduleController };