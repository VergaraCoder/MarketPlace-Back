import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard } from 'src/auth/jwt/guards/verifyJwt.guard';
import { Request } from 'express';

interface DataPayload{
  id: number;
  cart:number;
  email: string;
  name:string;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto,@Req() request:Request) {
    const requestData:DataPayload | any=request["user"];
    console.log(requestData);
    
    return this.ordersService.create({...createOrderDto,...requestData});
  }

  @UseGuards(JwtGuard)
  @Get("oneUser")
  findAll(@Req() request:Request) {
    const requestData:DataPayload| any =request["user"];
    return this.ordersService.ordersByUser(requestData.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: any) {
  //   return this.ordersService.updateOrderQuantity(+id, updateOrderDto.quantity);
  // }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
