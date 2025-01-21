import { PaymentMethod } from "src/paymentMethod/entities/payment-method.entity";
import { DataSource, Repository } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

interface DataPayment{
    name:string;
}

export class SeederPaymentMethod implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoPayment:Repository<PaymentMethod>=dataSource.getRepository("paymentMethod");
        const dataPayment:DataPayment[]=[
            {name:"mercadopago"},
            {name:"paypal"},
        ];

        for(const x of dataPayment){
            const query:PaymentMethod=await repoPayment.findOneBy({name:x.name});
            if(!query){
                const createPayment:PaymentMethod=repoPayment.create(x);
                await repoPayment.save(createPayment);
            }
        }
    }
}