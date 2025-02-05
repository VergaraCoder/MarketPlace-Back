import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
import { VerifyDataSchedule } from './verifyData/verifyData';
import { ManageError } from 'src/common/Errors/custom.error';


@Injectable()
export class ScheduleService {

  constructor(
    @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
    private serviceService: ServicesService,
    private scheduleVerify:VerifyDataSchedule
  ) { }

  async create(createScheduleDto: CreateScheduleDto):Promise<Schedule> {
    try {
      await this.scheduleVerify.dateIsValidOrNot(createScheduleDto);
      const createSchedule: Schedule = this.scheduleRepository.create(createScheduleDto);
      await this.scheduleRepository.save(createSchedule);
      return createSchedule;
    } catch (err: any) {
      if(err.code == "ER_DUP_ENTRY"){
        throw new ManageError({
          type:"CONFLICT",
          message:"ESTA FECHA YA ESTA OCUPADA "
        })
      }
      throw ManageError.signedError(err.message);
    }
  }

  async scheduleAvailables(idService: number) {
    try {
      const now = new Date(); // Fecha actual
      const totalDaysInWeek = 5;

      const service = await this.serviceService.findOne(idService);

      const [minHour, maxHour] = service.rangeOfHours.split(",").map(Number);

      const daysRemaining = totalDaysInWeek - now.getDay();

      const datesAvailables: string[] = [];

      // Obtener horarios ya registrados
      const schedules = await this.scheduleRepository
        .createQueryBuilder("schedules")
        .where("schedules.idService = :idService", { idService })
        .orderBy("date", "ASC")
        .getMany();

      now.setTime(now.getTime() - 18000000); // mermamos 5 horas para transformarla a horario local

      // Generar horarios disponibles
      for (let i = 0; i <= daysRemaining; i++) {
        const dayStart = new Date(now); // Inicio del día
        dayStart.setHours(minHour, 0, 0, 0); // Comenzar desde la hora mínima

        for (let hour = minHour; hour <= maxHour; hour++) {
          const candidateDate = new Date(dayStart);

          candidateDate.setHours(hour);
          candidateDate.setDate(now.getDate() + i);
          candidateDate.setTime(candidateDate.getTime() - 18000000);

          // Verificar si el horario está ocupado
          const isOccupied = schedules.some(schedule => {
            const dateToCompare = new Date(schedule.date);
            return dateToCompare.getTime() === candidateDate.getTime()
          });

          if (!isOccupied) {
            datesAvailables.push(candidateDate.toISOString());
          }
        }
      }

      return datesAvailables;
    } catch (err) {
      console.error("Error generating schedule availabilities:", err);
      throw err;
    }
  }


  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
