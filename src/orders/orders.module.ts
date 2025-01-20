import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsCartModule } from 'src/productsCart/products-cart.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    ProductsCartModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[
    TypeOrmModule
  ]
})
export class OrdersModule {}
