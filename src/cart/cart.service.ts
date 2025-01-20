import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository:Repository<Cart>
  ){}

  async create(createCartDto: CreateCartDto):Promise<Cart> {
    try{
      const cart:Cart=this.cartRepository.create(createCartDto);
      await this.cartRepository.save(cart);
      return cart;
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

  findAll() {
    return `This action returns all cart`;
  }

  async findOneByUserId(id: number):Promise<Cart | null> {
      const cart:Cart=await this.cartRepository.findOneBy({idUser:id});
      if(!cart)
      {
        return null;
      }
      return cart;
  }

  async remove(id: number) :Promise<string>{
   try{
    const {affected}=await this.cartRepository.delete(id);
    if(affected==0){
      throw new ManageError({
        type:"NOT_FOUND",
        message:"THE CART NOT EXIST"
      });
    }
    return "melo"
   }catch(err:any){
    throw ManageError.signedError(err.message);
   }
  }
}
