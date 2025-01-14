import { Injectable } from '@nestjs/common';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opinion } from './entities/opinion.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class OpinionsService {

  constructor(
    @InjectRepository(Opinion) private OpinionRepository:Repository<Opinion>
  ){}

  async create(createOpinionDto: CreateOpinionDto):Promise<Opinion> {
    try{
      const createOpinion:Opinion=this.OpinionRepository.create(createOpinionDto);
      await this.OpinionRepository.save(createOpinion);
      return createOpinion;
    }catch(err:any){
      throw err;
    }
  }

  async findAll():Promise<Opinion[]> {
    try{
      const opinions:Opinion[]=await this.OpinionRepository.find();
      if(opinions.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"NOT FOUND OPINIONS"
        });
      }
      return opinions;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number):Promise<Opinion> {
    try{
      const opinion:Opinion=await this.OpinionRepository.findOneBy({id:id});
      if(!opinion){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"NOT FOUND OPINIONS"
        });
      }
      return opinion;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateOpinionDto: UpdateOpinionDto):Promise<string> {
    try{
      const {affected}:number | any=await this.OpinionRepository.update(id,updateOpinionDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"NOT FOUND OPINIONS"
        });
      }
      return "melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) :Promise<string>{
    try{
      const {affected}:number | any=await this.OpinionRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"NOT FOUND OPINIONS"
        });
      }
      return "melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
