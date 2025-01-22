import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { LocalGuard } from './jwt/guards/local.guard';

interface ReturnTokens{
  access_token:string;
  refresh_token:string;
}

interface PayloadToken{
  id: number;
  cart:number;
  email: string;
  name:string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  create(@Body() createAuthDto: CreateAuthDto,@Req() request:Request):ReturnTokens {
    const dataUser:PayloadToken | any=request["user"];
    return this.authService.create(dataUser);
  }
}
