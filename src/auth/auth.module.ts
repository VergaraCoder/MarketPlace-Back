import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './jwt/strategys/local.strategy';
import { LocalGuard } from './jwt/guards/local.guard';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(ConfigService:ConfigService)=>({
        secret:ConfigService.get<string>("JWT_SECRET")
      })
    }),
    UsersModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    JwtModule,
    LocalStrategy,
    LocalGuard,
    AuthService
  ],
  exports:[
    JwtModule
  ]
})
export class AuthModule {}
