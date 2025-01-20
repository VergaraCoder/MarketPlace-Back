import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart]),
    UsersModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[
    TypeOrmModule
  ]
})
export class CartModule {}
