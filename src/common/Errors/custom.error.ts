import { HttpException, HttpStatus } from "@nestjs/common";

export class ManageError extends Error{
    constructor({type,message}:{type:keyof typeof HttpStatus, message:string}){
        super(`${type} :: ${message}`);
    }

    public static signedError(message:string){
        const error:string=message.split(" :: ")[0];
        if(error){
            throw new HttpException(message,HttpStatus[error]);
        }else{
            throw new HttpException("INTERNAL SERVER ERROR",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}