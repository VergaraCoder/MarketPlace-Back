import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    UsersModule,
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[
    TypeOrmModule
  ]
})
export class ProductModule {}
