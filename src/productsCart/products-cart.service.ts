import { Injectable } from '@nestjs/common';
import { CreateProductsCartDto } from './dto/create-products-cart.dto';
import { UpdateProductsCartDto } from './dto/update-products-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsCart } from './entities/products-cart.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ManageError } from 'src/common/Errors/custom.error';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';

interface CartParameters{
  idCart:number;
  idProduct:number;
}

@Injectable()
export class ProductsCartService {

  constructor(
    @InjectRepository(ProductsCart) private productCartRepository: Repository<ProductsCart>,
    private orderService:OrdersService,
  ) { 

  }


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


    async updateProductCartQuantity(idProductCart: number, quantity: any) {
      try{
        const {affected}=await this.productCartRepository.update({id:idProductCart},{quantity:quantity});      
        if(affected==0){
          throw new ManageError({
            type:"NOT_FOUND",
            message:"FAILED TO UPDATED"
          });
        }
        await this.orderService.updateOrderTotalPrice(idProductCart,quantity);
        return "melo";
      }catch(err:any){
        console.log(
          err
        );
        
      }
    }


  async update(id: number, updateProductsCartDto: UpdateProductsCartDto): Promise<string> {
    try{
      const {affected}=await this.productCartRepository.update(id,updateProductsCartDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILTED TO UPDATED"
        });
      }
      return "melo";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
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
