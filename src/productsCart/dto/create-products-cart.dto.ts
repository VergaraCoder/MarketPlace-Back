import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductsCartDto {
    @IsNotEmpty()
    @IsNumberString()
    idProduct:string;

    @IsNotEmpty()
    @IsNumber()
    quantity:number;

    @IsOptional()
    idCart:number;
}
