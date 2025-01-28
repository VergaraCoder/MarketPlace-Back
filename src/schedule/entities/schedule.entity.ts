import { Service } from "src/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idService:number;

    @Column({unique:true})
    date:string;

    @ManyToOne(()=>Service,service=>service.schedule)
    @JoinColumn({name:"idService"})
    service:Service;
}
