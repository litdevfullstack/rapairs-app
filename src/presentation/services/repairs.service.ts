import { Repairs } from "../../data"
import { CustomError } from "../../domain"

enum RepairsStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class RepairService {
    
    constructor(){
        
    }
    
    async createRepair(repair: any) {
        const newRepair = new Repairs()

        newRepair.date = repair.date
        newRepair.user_id = repair.user_id
        newRepair.status = RepairsStatus.IN_PROGRESS
        
        try {
            const result = await newRepair.save()
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findAllRepairs() {
        try {
            const result = await Repairs.find({
                where: {
                    status: RepairsStatus.PENDING
                }
            })
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }
    
    async findOneRepair(id: number) {
        try {
            const result = await Repairs.findOne({ where: { id } })
            return result
        } catch (error) {
            throw CustomError.notFound("Repair not found");
        }
    }

    async updateRepair(id: number, repair: any) {
        const updatedRepair = await this.findOneRepair(id)
        updatedRepair.date = repair.date
        updatedRepair.status = repair.status
        updatedRepair.user_id = repair.user_id
        try {
            const result = await updatedRepair.save()
            return result
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong" );
        }
    }

    async deleteRepair(id: number) {
        const repair = await this.findOneRepair(id)

        repair.status = RepairsStatus.CANCELLED

        try {
            await repair.save()
            return ("Repair completed")
        } catch (error) {    
            throw CustomError.internalServer("Something went very wrong" );
        }
    }
}
