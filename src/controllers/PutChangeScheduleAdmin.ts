import { Request, Response } from "express";
import { AdminChangeScheduleService } from "../services/AdminChangeScheduleService";

class AdminChangeScheduleController {
    async handle(req: Request, res: Response) {
        const { situation } = req.body;
        const { id: schedule_id } = req.params;

        const adminChangeScheduleService = new AdminChangeScheduleService();

        const newSchedule = await adminChangeScheduleService.execute({ schedule_id, situation });

        return res.json(newSchedule);
    }
}

export { AdminChangeScheduleController };