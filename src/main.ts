import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/Errors/error.exceptionFilter';
import { DataSource } from 'typeorm';
import { SeederRole } from './common/db/seeders/role.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource:DataSource=app.get(DataSource);
  const seederRole:SeederRole=new SeederRole();

  await seederRole.run(dataSource);
  
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
