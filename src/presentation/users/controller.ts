import { Request, Response } from "express"
import { UserService } from "../services/user.service"



export class UserController {

    constructor(
        public readonly userService: UserService
    ) { }

    createUser = async (req: Request, res: Response) => {
        const { name, email, password, rol } = req.body;
        this.userService.createUser({ name, email, password, rol })
        .then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            return res.status(500).json(err)                                               
        });
    }

    findAllUsers = async (req: Request, res: Response) => {
        
        this.userService.findAllUsers()
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        });

    }

    findOneUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.findOneUser(+id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => { 
            return res.status(500).json(err)
        })

    }

    UpdateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, password, rol } = req.body;
        this.userService.UpdateUser(+id, { name, email, password, rol })
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })

    }

    deleteUser = async(req: Request, res: Response) => {
        const { id } = req.params;
        this.userService.deleteUser(+id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json(err)
        })
    }


}
