import { Request, Response } from "express";
import { GetMySchedulesService } from "../services/GetMySchedulesService";

class GetMySchedulesController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;

        const getMySchedulesService = new GetMySchedulesService();

        const mySchedules = await getMySchedulesService.execute(user_id);

        return res.json(mySchedules);
    }
}

export { GetMySchedulesController };