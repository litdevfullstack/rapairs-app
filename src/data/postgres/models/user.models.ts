import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { BaseEntity } from "typeorm/repository/BaseEntity";

enum UserRole {
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'
}

enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })

    @Column({
        enum: UserRole,
        nullable: false,
        default: UserRole.CLIENT
    })
    rol: UserRole;

    @Column({
        enum: UserStatus,
        nullable: false,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}