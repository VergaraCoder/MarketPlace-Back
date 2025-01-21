import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class ErrorFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request:Request=host.switchToHttp().getRequest();
        const response:Response=host.switchToHttp().getResponse();

        let status:number;
        let message:string;
        const ifExist:string[]=exception.message.split(" :: ");
        const ifExist2:any=exception.response;

        console.log(exception);
        
        if(ifExist2 && ifExist2.message){
            status=ifExist2.StatusCode ? ifExist2.statusCode : 400;
            message=ifExist2.message;
        }
        else if(ifExist.length==2){
            status=HttpStatus[ifExist[0]];
            message=ifExist[1];
        }
        else{
            status=HttpStatus.INTERNAL_SERVER_ERROR;
            message="Internal Server Error";
        }

        response.status(status).json({
            message:message,
            timeStamp:new Date().toISOString(),
            path:request.url,
            method:request.method,
            statusCode:status
        });
    }
}