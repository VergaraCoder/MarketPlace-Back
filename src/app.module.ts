import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BuysModule } from './buys/buys.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [UsersModule,OpinionsModule, CategoriesModule, BuysModule, SalesModule],
  controllers: [],
  providers: [
    
  ],
})
export class AppModule {}
