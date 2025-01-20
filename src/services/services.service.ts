import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ){}

  async create(createServiceDto: CreateServiceDto):Promise<Service> {
    try{
      const createData:Service=this.serviceRepository.create(createServiceDto);
      await this.serviceRepository.save(createData)
      return createData;
    }catch(err:any){
      if(err instanceof QueryFailedError){
        throw new ManageError({
          type:"CONFLICT",
          message:"EL USUARIO REFERENCIADO NO EXISTE"
        });
      }
      throw ManageError.signedError(err.message);
    }
  }

 async findAll():Promise<Service[]> {
   try{
    const services:Service[]=await this.serviceRepository.find();
    if(services.length==0){
      throw new ManageError({
        type:"NOT_FOUND",
        message:"DOES NOT THERE ARE SERVICES"
      });
    }
    return services;
   }catch(err:any){
    throw ManageError.signedError(err.message);
   }
  }

  async findOne(id: number):Promise<Service> {
    try{
      const service:Service=await this.serviceRepository.findOneBy({id});
      if(!service){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES NOT THERE ARE SERVICES"
        });
      }
      return service;
     }catch(err:any){
      throw ManageError.signedError(err.message);
     }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) :Promise<string>{
    try{
      const {affected}=await this.serviceRepository.update(id,updateServiceDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE SERVICE"
        });
      }
      return "melo";
     }catch(err:any){
      throw ManageError.signedError(err.message);
     }
  }

 async remove(id: number):Promise<string> {
  try{
    const {affected}=await this.serviceRepository.delete(id);
    if(affected==0){
      throw new ManageError({
        type:"NOT_FOUND",
        message:"FAILED TO DELETE SERVICE"
      });
    }
    return "melo";
   }catch(err:any){
    throw ManageError.signedError(err.message);
   }
  }
}
