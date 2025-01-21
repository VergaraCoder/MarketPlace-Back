import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { use } from "passport";
import { Strategy } from "passport-local";
import { CartService } from "src/cart/cart.service";
import { Cart } from "src/cart/entities/cart.entity";
import { ManageError } from "src/common/Errors/custom.error";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


interface PayloadToken{
    id: number;
    cart:number;
    email: string;
    name:string
  }
  

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService:UsersService,
        private cartService:CartService
    ){
        super({
            usernameField:"email",
            passwordField:"password"
        })
    }

    async validate(email:string,password:string):Promise<PayloadToken>{
        try{
            
            const user:User | null=await this.userService.verifyUserByEmailAndPassword({email,password});
            if(!user){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE USER DONT EXIST"
                });
            }

            const cart:Cart=await this.cartService.create({idUser:user.id});
            const payloadUser:PayloadToken={
                id:user.id,
                cart:cart.id,
                email:user.email,
                name:user.name
            }

            return payloadUser;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
} 