import { Module } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opinion } from './entities/opinion.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Opinion])
  ],
  controllers: [OpinionsController],
  providers: [OpinionsService],
})
export class OpinionsModule {}
