import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTokenDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    name:string;

    
    @IsNotEmpty()
    @IsNumber()
    id:number;
}