import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';
import { Request } from './requests/requests.model';
import { TypesModule } from './types/types.module';
import { StatusesModule } from './statuses/statuses.module';
import { Status } from './statuses/statuses.model';
import { Type } from './types/types.model';
import { FilesModule } from './files/files.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Request, Status, Type],
      autoLoadModels: true,
    }),
    RequestsModule,
    TypesModule,
    StatusesModule,
    FilesModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class AppModule {}
