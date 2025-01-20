import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    duration:string;

    @Column()
    pricePerDuration:number;

    @Column()
    idUser:number;

    @ManyToOne(()=>User,user=>user.service,{onDelete:"CASCADE",nullable:false})
    @JoinColumn({name:"idUser"})
    user:User;  
}
