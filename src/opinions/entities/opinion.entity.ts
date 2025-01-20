import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("opinions")
export class Opinion {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;
    
    @Column()
    description:string;
    
    @Column()
    idOpinator:number;

    @Column()
    idProduct:number;

    @ManyToOne(()=>User,user=>user.opinion)
    user:User;

    @ManyToOne(()=>Product,product=>product.opinion)
    product:Product[];

}
