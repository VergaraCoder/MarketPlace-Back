import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Buy } from "src/buys/entities/buy.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Opinion } from "src/opinions/entities/opinion.entity";
import { Order } from "src/orders/entities/order.entity";
import { PaymentMethod } from "src/paymentMethod/entities/payment-method.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductsCart } from "src/productsCart/entities/products-cart.entity";
import { Role } from "src/role/entities/role.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";




@Injectable()
export class DbConfig implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        console.log("the user is");
        console.log(this.configService.get<string>("DB_USERNAME"));
        
        return({
            type:"mysql",
            host:this.configService.get<string>("DB_HOST"),
            port:this.configService.get<number>("DB_PORT"),
            password:this.configService.get<string>("DB_PASSWORD"),
            username:this.configService.get<string>("DB_USERNAME"),
            database:this.configService.get<string>("DB_DATABASE"),
            entities:[User,Buy,Sale,Opinion,Product,PaymentMethod,Service,Cart,ProductsCart,Order,Role],
            synchronize:true
        });   
    }
}