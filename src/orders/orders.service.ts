import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const orderData: Order = this.orderRepository.create(createOrderDto);
      await this.orderRepository.save(orderData);
      return orderData;
    } catch (err: any) {
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
}
