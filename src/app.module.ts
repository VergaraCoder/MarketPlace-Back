import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule,OpinionsModule, CategoriesModule],
  controllers: [],
  providers: [
    
  ],
})
export class AppModule {}
