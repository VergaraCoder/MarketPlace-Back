import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Sale) private SaleRepository:Repository<Sale>
  ){}

  async create(createSaleDto: CreateSaleDto) {
    try{
      const sale:Sale = this.SaleRepository.create(createSaleDto);
      await this.SaleRepository.save(sale);
      return sale;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const sales:Sale[] =await this.SaleRepository.find();
      if(sales.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT SALES"
        });
      }
      return sales;
    }catch(err:any){
      throw ManageError.signedError(err.message);

    }
  }

  async findOne(id: number) {
    try{
      const sale:Sale = await this.SaleRepository.findOneBy({id:id});
      if(!sale){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT SALES"
        });
      }
      return sale;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try{
      const {affected}:number | any = await this.SaleRepository.update(id,updateSaleDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT SALES"
        });
      }
      return "melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}:number | any = await this.SaleRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT SALES"
        });
      }
      return "melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
