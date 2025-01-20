import { Opinion } from "src/opinions/entities/opinion.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price:number;
    
    @Column()
    idSeller:number;

    @ManyToOne(()=>User,user=>user.product)
    user:User;

    @OneToMany(()=>Opinion,opinion=>opinion.product)
    opinion:Opinion[];

    @OneToMany(()=>Sale,sale=>sale.product)
    sale:Sale[];
}
