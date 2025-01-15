import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class PaymentMethodService {

  constructor(
    @InjectRepository(PaymentMethod) private PaymentRepository:Repository<PaymentMethod>
  ){}

  async create(createPaymentMethodDto: CreatePaymentMethodDto):Promise<PaymentMethod> {
    try{
      const createPayment:PaymentMethod=this.PaymentRepository.create(createPaymentMethodDto);
      await this.PaymentRepository.save(createPayment);
      return createPayment;
    }catch(err:any){
      throw err;
    }
  }

  async findAll():Promise<PaymentMethod[]> {
    try{
      const payments:PaymentMethod[]=await this.PaymentRepository.find();
      if(payments.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT PAYMENT METHODS"
        });
      }
      return payments;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number):Promise<PaymentMethod> {
    try{
      const payment:PaymentMethod=await this.PaymentRepository.findOneBy({id:id});
      if(!payment){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS PAYMENT METHOD DONT EXIST"
        });
      }
      return payment;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto):Promise<string> {
    try{
      const {affected}:number | any=await this.PaymentRepository.update(id,updatePaymentMethodDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS PAYMENT METHOD DONT EXIST"
        });
      }
      return"melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      const {affected}:number | any=await this.PaymentRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS PAYMENT METHOD DONT EXIST"
        });
      }
      return"melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
