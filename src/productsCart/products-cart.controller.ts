import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsCartService } from './products-cart.service';
import { CreateProductsCartDto } from './dto/create-products-cart.dto';
import { UpdateProductsCartDto } from './dto/update-products-cart.dto';
import { JwtGuard } from 'src/auth/jwt/guards/verifyJwt.guard';

interface PayloadToken {
  id: number;
  cart:number;
  email: string;
  name: string
}

@Controller('products-cart')
export class ProductsCartController {
  constructor(private readonly productsCartService: ProductsCartService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createProductsCartDto: CreateProductsCartDto,@Req() request:Request) {
    console.log("enterrr");
    const payloadToken:PayloadToken=request["user"];
    console.log(payloadToken);
    
    return this.productsCartService.create({...createProductsCartDto,idCart:payloadToken.cart});
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsCartDto: UpdateProductsCartDto) {
    return this.productsCartService.updateProductCartQuantity(+id, updateProductsCartDto.quantity);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCartService.remove(+id);
  }
}
