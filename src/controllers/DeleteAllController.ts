import { DeleteAllService } from "../services/DeleteAllService";
import { Request, Response } from "express";

class DeleteAllController {
    async handle(req: Request, res: Response) {
        const deleteAllService = new DeleteAllService();

        await deleteAllService.execute();

        return res.json("All appointments delleted!");
    }
}

export { DeleteAllController };