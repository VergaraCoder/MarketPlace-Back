import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Buy } from "src/buys/entities/buy.entity";
import { Opinion } from "src/opinions/entities/opinion.entity";
import { PaymentMethod } from "src/paymentMethod/entities/payment-method.entity";
import { Product } from "src/product/entities/product.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { User } from "src/users/entities/user.entity";




@Injectable()
export class DbConfig implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type:"mysql",
            host:this.configService.get<string>("DB_HOST"),
            port:this.configService.get<number>("DB_PORT"),
            username:this.configService.get<string>("DB_USERNAME"),
            database:this.configService.get<string>("DB_DATABASE"),
            entities:[User,Buy,Sale,Opinion,Product,PaymentMethod],
            synchronize:true
        });   
    }
}