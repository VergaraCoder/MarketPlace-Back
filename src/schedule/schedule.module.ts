import { forwardRef, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ServicesModule } from 'src/services/services.module';
import { VerifyDataSchedule } from './verifyData/verifyData';

@Module({
  imports:[
    TypeOrmModule.forFeature([Schedule]),
    forwardRef(()=>ServicesModule)
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    VerifyDataSchedule
  ],
  exports:[
    TypeOrmModule
  ]
})
export class ScheduleModule {}
