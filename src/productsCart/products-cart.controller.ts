import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsCartService } from './products-cart.service';
import { CreateProductsCartDto } from './dto/create-products-cart.dto';
import { UpdateProductsCartDto } from './dto/update-products-cart.dto';
import { JwtGuard } from 'src/auth/jwt/guards/verifyJwt.guard';

@Controller('products-cart')
export class ProductsCartController {
  constructor(private readonly productsCartService: ProductsCartService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createProductsCartDto: CreateProductsCartDto) {
    return this.productsCartService.create(createProductsCartDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.productsCartService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCartService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsCartDto: UpdateProductsCartDto) {
    return this.productsCartService.update(+id, updateProductsCartDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCartService.remove(+id);
  }
}
