import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';
import { BuysModule } from './buys/buys.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/db/Db.config';
import { PaymentMethodModule } from './paymentMethod/payment-method.module';
import { ProductModule } from './product/product.module';
import { ServicesModule } from './services/services.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useClass:DbConfig
    })
    ,
    UsersModule, OpinionsModule, BuysModule, SalesModule, AuthModule, PaymentMethodModule, ProductModule, ServicesModule, CartModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
