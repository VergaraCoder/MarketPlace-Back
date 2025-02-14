import { Buy } from 'src/buys/entities/buy.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import { Product } from 'src/product/entities/product.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Service } from 'src/services/entities/service.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({default:"mi casa"})
    ubication:string;

    @OneToMany(()=>Opinion,opinion=>opinion.user)
    opinion:Opinion[];

    @OneToMany(()=>Buy,buy=>buy.user)
    buy:Buy[];

    @OneToMany(()=>Product,prooduct=>prooduct.user)
    product:Product[];
   
    @OneToMany(()=>Sale,sale=>sale.user)
    sale:Sale[];

    @OneToMany(()=>Service,service=>service.user)
    service:Service[];

    @OneToMany(()=>Cart,cart=>cart.user)
    cart:Cart[];
}
