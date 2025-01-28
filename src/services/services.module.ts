import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Service]),
    UsersModule,
    AuthModule,
    ScheduleModule
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports:[
    TypeOrmModule,
    ServicesService
  ]
})
export class ServicesModule {}
