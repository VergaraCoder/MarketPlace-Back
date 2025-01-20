import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsCartDto } from './create-products-cart.dto';

export class UpdateProductsCartDto extends PartialType(CreateProductsCartDto) {}
