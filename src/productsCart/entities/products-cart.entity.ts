import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { AfterUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity("productsCart")
export class ProductsCart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idCart:number;

    @Column()
    idProduct:number;

    @Column()
    quantity:number;

    @ManyToOne(()=>Cart,cart=>cart.productCart)
    @JoinColumn(({name:"idCart"}))
    cart:Cart;

    @ManyToOne(()=>Product,product=>product.productCart,{eager:true})
    @JoinColumn(({name:"idProduct"}))
    product:Product;

    @OneToMany(()=>Order,order=>order.productCart,{onUpdate:"CASCADE"})
    order:Order[];
}

