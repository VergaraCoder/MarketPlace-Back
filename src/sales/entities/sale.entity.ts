import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sales")
export class Sale {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;
    
    @Column()
    idSeller:number;

    @Column()
    idProduct:number;

    @ManyToOne(()=>Product,product=>product.sale)
    product:Product;

    @ManyToOne(()=>User,user=>user.sale)
    user:User;
}
