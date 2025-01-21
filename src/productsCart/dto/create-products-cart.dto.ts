import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductsCartDto {
    @IsNotEmpty()
    @IsNumber()
    idProduct:number;

    @IsNotEmpty()
    @IsNumber()
    quantity:number;
}
