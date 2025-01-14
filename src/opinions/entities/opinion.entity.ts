import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

}
