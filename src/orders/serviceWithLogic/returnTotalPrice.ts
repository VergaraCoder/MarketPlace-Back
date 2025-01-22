import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/entities/product.entity";
import { ProductsCart } from "src/productsCart/entities/products-cart.entity";
import { Repository } from "typeorm";


@Injectable()
export class ReturnTotalPrice {
    
    constructor(
        @InjectRepository(ProductsCart) private productCartRepository:Repository<ProductsCart>
    ){}

    async returnTotalPrice(cartId:number):Promise<ProductsCart[]>{
        console.log("enter to find products");
        
        const products:ProductsCart[]=await this.productCartRepository.createQueryBuilder("productsCart")
        .leftJoinAndSelect("productsCart.product","prod")
        .andWhere("productsCart.idProduct = prod.id")
        .andWhere("productsCart.idCart = :cart",{cart:cartId})
        .getMany();
        
        console.log("salimos"); 
        // salida de 2
        console.log(products);
        
        return products;
    }

}