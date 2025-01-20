import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=>Product,product=>product.productCart)
    @JoinColumn(({name:"idProduct"}))
    product:Product;
}

