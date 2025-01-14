import { Module } from '@nestjs/common';
import { OpinionsModule } from './opinions/opinions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,OpinionsModule],
  controllers: [],
  providers: [
    
  ],
})
export class AppModule {}
