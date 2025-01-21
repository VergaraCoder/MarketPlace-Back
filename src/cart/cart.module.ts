import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart]),
    UsersModule,
    AuthModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[
    TypeOrmModule
  ]
})
export class CartModule {}
