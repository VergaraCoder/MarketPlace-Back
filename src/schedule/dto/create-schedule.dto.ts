import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    date:string;

    @IsNotEmpty()
    @IsNumber()
    idService:number;
}
