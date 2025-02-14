import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ManageError } from 'src/common/Errors/custom.error';
import { CreateTokenDto } from './dto/createToken.dto';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';

interface ReturnTokens{
  access_token:string;
  refresh_token:string;
}

interface PayloadToken{
  id: number;
  cartId:number;
  email: string;
  name:string;
  iat:number;
  exp:number;
}

interface ReturnDataRenovateToken extends ReturnTokens {
  id:number;
  cartId:number;
  email: string;
  name: string
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService,
    private cartService:CartService
  ){}

  async create(createAuthDto: CreateTokenDto):Promise<ReturnTokens> {
    const cartId:Cart=await this.cartService.create({idUser:createAuthDto.id});
    return{
      access_token: this.jwtService.sign({...createAuthDto,cartId:cartId.id},{expiresIn:"20m"}),
      refresh_token: this.jwtService.sign({...createAuthDto,cartId:cartId.id},{expiresIn:"4d"})
    }
  }

  async renovateToken(refreshToken:string):Promise<ReturnDataRenovateToken>{
    try{
      const payload:PayloadToken=await this.jwtService.verify(refreshToken);
      delete payload.iat;
      delete payload.exp;
      const newTokens:ReturnTokens=await this.create({id:payload.id,email:payload.email,name:payload.name,cartId:payload.cartId})
      return{
        access_token:newTokens.access_token,
        refresh_token:newTokens.refresh_token,
        ...payload
      }
    }catch(err:any){
      if(err.message=="jwt expired"){
        throw new ManageError({
          type:"UNAUTHORIZED",
          message:"THE SESSION IS VENCED"
        })
      }
      throw ManageError.signedError(err.message);
    }
  }
}
