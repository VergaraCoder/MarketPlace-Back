import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { use } from "passport";
import { Strategy } from "passport-local";
import { ManageError } from "src/common/Errors/custom.error";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


interface PayloadToken{
    id: number;
    email: string;
    name:string
  }
  

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService:UsersService,
    ){
        super({
            usernameField:"email",
            passwordField:"password"
        })
    }

    async verifyUser(email:string,password:string):Promise<PayloadToken>{
        try{
            const user:User | null=await this.userService.verifyUserByEmailAndPassword({email,password});
            if(!user){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE USER DONT EXIST"
                });
            }
            const payloadUser:PayloadToken={
                id:user.id,
                email:user.email,
                name:user.name
            }

            return payloadUser;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
} 