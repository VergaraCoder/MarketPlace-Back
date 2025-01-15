import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';
import { BuysModule } from './buys/buys.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/db/Db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    // TypeOrmModule.forRootAsync({
    //   imports:[ConfigModule],
    //   inject:[ConfigService],
    //   useClass:DbConfig
    // })
    ,
    UsersModule, OpinionsModule, BuysModule, SalesModule, AuthModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
