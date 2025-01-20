import { ProductsCart } from "src/productsCart/entities/products-cart.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idUser:number;

    @ManyToOne(()=>User,user=>user.cart)
    user:User;

    @OneToMany(()=>ProductsCart,productCart=>productCart.cart)
    productCart:ProductsCart[];
}
