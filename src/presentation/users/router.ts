import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";

export class UsersRoutes {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const controller = new UserController(userService);

        router.get('/', controller.findAllUsers);
        router.post('/', controller.createUser);
        router.get('/:id', controller.findOneUser);
        router.patch('/:id', controller.UpdateUser);
        router.delete('/:id', controller.deleteUser)

        return router;
    }
}