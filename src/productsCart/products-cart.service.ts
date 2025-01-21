import { Injectable } from '@nestjs/common';
import { CreateProductsCartDto } from './dto/create-products-cart.dto';
import { UpdateProductsCartDto } from './dto/update-products-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsCart } from './entities/products-cart.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';

interface CartParameters{
  idCart:number;
  idProduct:number;
}

@Injectable()
export class ProductsCartService {

  constructor(
    @InjectRepository(ProductsCart) private productCartRepository: Repository<ProductsCart>
  ) { }

  async create(createProductsCartDto: CartParameters):Promise<ProductsCart> {
    try {
      const productCart: ProductsCart = this.productCartRepository.create(createProductsCartDto);
      await this.productCartRepository.save(productCart);
      return productCart;
    } catch (err: any) {
      if (err instanceof QueryFailedError) {
        throw new ManageError({
          type: "CONFLICT",
          message: "ALGUNA REFERENCIA NO FUNCIONA NO EXISTE"
        });
      }
      throw ManageError.signedError(err.message);
    }
  }

  findAll() {
    return `This action returns all productsCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsCart`;
  }

  update(id: number, updateProductsCartDto: UpdateProductsCartDto) {
    return `This action updates a #${id} productsCart`;
  }

  async remove(id: number) {
    try{
      const {affected}=await this.productCartRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"PRODUCT CART NOT FOUND"
        });
      }
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
