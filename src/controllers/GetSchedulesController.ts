import { Request, Response } from "express";
import { GetSchedulesService } from "../services/GetSchedulesService";

class GetSchedulesController {
    async handler(req: Request, res: Response) {
        const getSchedulesService = new GetSchedulesService();

        const appointments = await getSchedulesService.execute();

        return res.json(appointments);
    }
}

export { GetSchedulesController };