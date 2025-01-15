import { Buy } from 'src/buys/entities/buy.entity';
import { Opinion } from 'src/opinions/entities/opinion.entity';
import { Product } from 'src/product/entities/product.entity';
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

    @Column()
    ubication:string;

    @OneToMany(()=>Opinion,opinion=>opinion.user)
    opinion:Opinion[];

    @OneToMany(()=>Buy,buy=>buy.user)
    buy:Buy[];

    @OneToMany(()=>Product,prooduct=>prooduct.user)
    product:Product[];


}
