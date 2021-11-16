import { Request, Response } from "express";
import { InvalidArgumentError } from "../errors/HTTPErrors";
import { ScheduleService } from "../services/ScheduleService";

class ScheduleController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { scheduled_date, situation } = req.body;

        if(!scheduled_date) {
            throw new InvalidArgumentError();
        }

        const scheduleService = new ScheduleService();

        const schedule = await scheduleService.execute({
                user_id, 
                scheduled_date: new Date(scheduled_date).getTime(), 
                situation 
            }
        );

        return res.json(schedule);
    }
}

export { ScheduleController };