import { Request, Response } from "express"
import { RepairService } from "../services/repairs.service";


export class RepairsController {

    constructor(
        private readonly repairService: RepairService
    ) { }

    createRepair = (req: Request, res: Response) => {
        const { date, user_id, status } = req.body;
        this.repairService.createRepair({ date, user_id, status })
            .then(repair => res.status(201).json(repair))
            .catch(err => res.status(500).json(err))
    }

    findAllRepairs = (req: Request, res: Response) => {
        const repairs = this.repairService.findAllRepairs()
            .then(repairs => res.status(200).json(repairs))
            .catch(err => res.status(500).json(err))
    }

    findOneRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.findOneRepair(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    UpdateRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        const { date, user_id, status } = req.body;
        this.repairService.updateRepair(+id, { date, user_id, status })
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }

    deleteRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.deleteRepair(+id)
            .then(repair => res.status(200).json(repair))
            .catch(err => res.status(500).json(err))
    }


}