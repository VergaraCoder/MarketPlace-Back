import { Injectable } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Buy } from './entities/buy.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class BuysService {

  constructor(
    @InjectRepository(Buy)
    private BuyRepository: Repository<Buy>
  ) { }

  async create(createBuyDto: CreateBuyDto):Promise<Buy> {
    try {
      const createBuy: Buy = this.BuyRepository.create(createBuyDto);
      await this.BuyRepository.save(createBuy);
      return createBuy;
    } catch (err: any) {
      throw err;
    }
  }

  async findAll() :Promise<Buy[]>{
    try {
      const buys: Buy[] = await this.BuyRepository.find();
      if(buys.length===0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT BUYS"
        });
      }
      return buys;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number):Promise<Buy> {
    try {
      const buy: Buy = await this.BuyRepository.findOneBy({id:id});
      if(!buy){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT BUY"
        });
      }
      return buy;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateBuyDto: UpdateBuyDto):Promise<string> {
    try {
      const {affected} :number | any= await this.BuyRepository.update(id,updateBuyDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT BUY"
        });
      }
      return "melo";
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number):Promise<string> {
    try {
      const {affected} :number | any= await this.BuyRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT BUY"
        });
      }
      return "melo";
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }
}
