import { Router } from "express";
import { RepairsController } from "./controller";
import { RepairService } from "../services/repairs.service";


export class RepairssRoutes {
    static get routes(): Router {
        const router = Router();
        const repairService = new RepairService();
        const controller = new RepairsController(repairService)

        router.get('/', controller.findAllRepairs);
        router.post('/', controller.createRepair);
        router.get('/:id', controller.findOneRepair);
        router.patch('/:id', controller.UpdateRepair);
        router.delete('/:id', controller.deleteRepair);

        return router;
    }
}