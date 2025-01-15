import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BuysModule } from './buys/buys.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    UsersModule, OpinionsModule, CategoriesModule, BuysModule, SalesModule, AuthModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
