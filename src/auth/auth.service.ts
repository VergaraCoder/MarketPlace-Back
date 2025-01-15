import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ManageError } from 'src/common/Errors/custom.error';
import { CreateTokenDto } from './dto/createToken.dto';

interface ReturnTokens{
  access_token:string;
  refresh_token:string;
}

interface PayloadToken{
  id: number;
  email: string;
  name:string
}

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService
  ){}

  create(createAuthDto: CreateTokenDto):ReturnTokens {
    return{
      access_token: this.jwtService.sign(createAuthDto,{expiresIn:"20m"}),
      refresh_token: this.jwtService.sign(createAuthDto,{expiresIn:"4d"})
    }
  }

  async renovateToken(refreshToken:string):Promise<ReturnTokens>{
    try{
      await this.jwtService.verify(refreshToken);
      const payload:PayloadToken=this.jwtService.decode(refreshToken);
      return this.create({id:payload.id,email:payload.email,name:payload.name})
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
