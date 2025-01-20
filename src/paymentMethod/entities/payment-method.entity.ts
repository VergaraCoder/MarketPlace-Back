import { Buy } from "src/buys/entities/buy.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymentMethod")
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(()=>Buy,buy=>buy.paymentMethod)
    buy:Buy[];
}
