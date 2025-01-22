import { ProductsCart } from "src/productsCart/entities/products-cart.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productCartId:number;

    @Column()
    totalPrice:number;

    @ManyToOne(()=>ProductsCart,productCart=>productCart.order,{eager:true})
    @JoinColumn({name:"productCartId"})
    productCart:ProductsCart;
}

