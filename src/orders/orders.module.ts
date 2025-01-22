import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsCartModule } from 'src/productsCart/products-cart.module';
import { AuthModule } from 'src/auth/auth.module';
import { ReturnTotalPrice } from './serviceWithLogic/returnTotalPrice';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    forwardRef(()=>ProductsCartModule),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ReturnTotalPrice
  ],
  exports:[
    TypeOrmModule,
    OrdersService,
  ]
})
export class OrdersModule {}
