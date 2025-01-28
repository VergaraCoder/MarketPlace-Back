import { scheduled } from "rxjs";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    pricePerDuration:number;

    @Column()
    idUser:number;

    @Column()
    rangeOfHours:string;

    @ManyToOne(()=>User,user=>user.service,{onDelete:"CASCADE",nullable:false})
    @JoinColumn({name:"idUser"})
    user:User;  

    @OneToMany(()=>Schedule,schedule=>schedule.service)
    schedule:Schedule[];
}
