import { User } from "../../data";
import { CustomError } from "../../domain";

enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}

export class UserService {
    
    constructor(){
        
    }
    
    async createUser(user: any) {
        const newUser = new User();

        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.rol = user.rol;
        
        try {
            const result = await newUser.save();
            return result;
        } catch (error) {
        throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async findAllUsers() {
        try {
            const result = await User.find({
                where: {
                    status: UserStatus.ACTIVE
                }
            });
            return result;
        } catch (error) {
        throw CustomError.internalServer("Something went very wrong" );
        }
    }
    
    async findOneUser(id: number) {
        try {
            const result = await User.findOne({ where: { id } });
            return result;
        } catch (error) {
       throw CustomError.notFound("User not found");
        }
    }

    async UpdateUser(id: number, user: any) {
        const updatedUser = await this.findOneUser(id);
        updatedUser.name = user.name;
        updatedUser.email = user.email;
        updatedUser.password = user.password;
        try {
            const result = await updatedUser.save();
            return updatedUser;
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async deleteUser(id: number) {
        const user = await this.findOneUser(id);

        user.status = UserStatus.DISABLED;

        try {
            await user.save();
            return ("Üser deleted");
        } catch (error) {    
         throw CustomError.internalServer("Something went very wrong" );
        }
    }
}
