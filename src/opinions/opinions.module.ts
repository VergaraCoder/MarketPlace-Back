import { Module } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opinion } from './entities/opinion.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Opinion]),
    ProductModule
  ],
  controllers: [OpinionsController],
  providers: [OpinionsService],
})
export class OpinionsModule {}
