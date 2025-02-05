import { Injectable } from "@nestjs/common";
import { ManageError } from "src/common/Errors/custom.error";
import { Service } from "src/services/entities/service.entity";
import { ServicesService } from "src/services/services.service";
import { CreateScheduleDto } from "../dto/create-schedule.dto";


@Injectable()
export class VerifyDataSchedule {

    constructor(
        private serviceService:ServicesService
    ){}

    async dateIsValidOrNot(data:CreateScheduleDto):Promise<boolean>{
        try{
            const dateToVerify:Date=new Date(data.date);
            console.log(dateToVerify);
            
            const service:Service=await this.serviceService.findOne(data.idService);
            const [minHour, maxHour] = service.rangeOfHours.split(",").map(Number);

            if(dateToVerify.getUTCHours() < minHour || dateToVerify.getUTCHours()>maxHour){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"EL PPRESTADOR DE ESTE SERVICIO NO A ESPECIFICADO UN RANGO HORARIO Y NO PUEDES HACER RESERVA FUERA DEL TIEMPO ESTABLECEDIO"
                });
            }
            else if(dateToVerify.getDay() > 5 || dateToVerify.getDay()==0){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"LA RESERVA DE LOS SERVICIOS SON UNICAMENTE EN SEMANA NO PUEDE SER PARA UN FIN DE SEMANA"
                });
            }
            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}