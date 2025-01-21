import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './jwt/strategys/local.strategy';
import { LocalGuard } from './jwt/guards/local.guard';
import { JwtGuard } from './jwt/guards/verifyJwt.guard';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(ConfigService:ConfigService)=>({
        secret:ConfigService.get<string>("JWT_SECRET")
      })
    }),
    forwardRef(()=>UsersModule)  
  ],
  controllers: [
    AuthController
  ],
  providers: [
    JwtService,
    LocalStrategy,
    LocalGuard,
    AuthService,
    JwtGuard
  ],
  exports:[
    JwtModule,
    JwtGuard,
    AuthService
  ]
})
export class AuthModule {}
