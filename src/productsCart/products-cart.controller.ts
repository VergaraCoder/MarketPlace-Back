import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsCartService } from './products-cart.service';
import { CreateProductsCartDto } from './dto/create-products-cart.dto';
import { UpdateProductsCartDto } from './dto/update-products-cart.dto';

@Controller('products-cart')
export class ProductsCartController {
  constructor(private readonly productsCartService: ProductsCartService) {}

  @Post()
  create(@Body() createProductsCartDto: CreateProductsCartDto) {
    return this.productsCartService.create(createProductsCartDto);
  }

  @Get()
  findAll() {
    return this.productsCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsCartDto: UpdateProductsCartDto) {
    return this.productsCartService.update(+id, updateProductsCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCartService.remove(+id);
  }
}
