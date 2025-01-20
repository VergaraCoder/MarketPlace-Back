import { PaymentMethod } from "src/paymentMethod/entities/payment-method.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("buys")
export class Buy {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;
    
    @Column()
    idPaymentMethod:number;
    
    @Column()
    idBuyer:number;

    @Column()
    idProduct:number;
    
    @ManyToOne(()=>User,user=>user.buy)
    user:User;

    @ManyToOne(()=>PaymentMethod,paymentMethod=>paymentMethod.buy)
    paymentMethod:PaymentMethod;
}
