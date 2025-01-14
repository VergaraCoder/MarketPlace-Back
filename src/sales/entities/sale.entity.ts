import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
