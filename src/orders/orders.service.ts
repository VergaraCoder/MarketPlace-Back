import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';
import { ReturnTotalPrice } from './serviceWithLogic/returnTotalPrice';
import { Product } from 'src/product/entities/product.entity';
import { ProductsCart } from 'src/productsCart/entities/products-cart.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private returnPrice:ReturnTotalPrice
  ) { }

  async create(createOrderDto: any): Promise<Order | any> {
    try {
      let suma:number=0;
      const result:ProductsCart[]=await this.returnPrice.returnTotalPrice(createOrderDto.cart);
      for(const x of result){
        suma+=x.quantity * x.product.price;
        const orderData: Order | any = this.orderRepository.create({productCartId:x.id,totalPrice:suma});
        await this.orderRepository.save(orderData);
        suma=0;
      }
    return ;
    } catch (err: any) {
      console.log(err);
      

      if (err instanceof QueryFailedError) {
        throw new ManageError({
          type: "CONFLICT",
          message: "EL USUARIO REFERENCIADO NO EXISTE"
        });
      }
      throw ManageError.signedError(err.message);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders: Order[] = await this.orderRepository.find();
      if (orders.length == 0) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "ORDERS NOT FOUND "
        });
      }
      return orders;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order: Order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "ORDERS NOT FOUND "
        });
      }
      return order;
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number): Promise<string> {
    try {
      const { affected } = await this.orderRepository.delete({ id });
      if (affected == 0) {
        throw new ManageError({
          type: "NOT_FOUND",
          message: "ORDERS NOT FOUND "
        });
      }
      return "melo";
    } catch (err: any) {
      throw ManageError.signedError(err.message);
    }
  }


  async ordersByUser(idUser:number){
    try{  
      const query=await this.orderRepository.createQueryBuilder("orders")
      .innerJoin("users","user")
      .andWhere("user.id = :user",{
        user:idUser
      })
      .getMany();
      console.log(query);
      
      return query;
    }catch(err:any){

      console.log(err);
      
    }
  }
}
