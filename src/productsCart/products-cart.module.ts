import { Module } from '@nestjs/common';
import { ProductsCartService } from './products-cart.service';
import { ProductsCartController } from './products-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsCart } from './entities/products-cart.entity';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductsCart]),
    CartModule,
    ProductModule,
    AuthModule
  ],
  controllers: [ProductsCartController],
  providers: [ProductsCartService],
  exports:[
    TypeOrmModule
  ]
})
export class ProductsCartModule {}
