import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymentMethod")
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}
