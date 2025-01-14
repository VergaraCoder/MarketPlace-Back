import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({enum:["tecnologia","deportes","hogar","servicios","animales"]})
    name:string
}
