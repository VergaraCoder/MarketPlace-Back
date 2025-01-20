import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idUser:number;

    @ManyToOne(()=>User,user=>user.cart)
    user:User;
}
