import { Module } from '@nestjs/common';
import { BuysService } from './buys.service';
import { BuysController } from './buys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buy } from './entities/buy.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Buy]),
    UsersModule
  ],
  controllers: [BuysController],
  providers: [BuysService],
  exports:[
    TypeOrmModule
  ]
})
export class BuysModule {}
