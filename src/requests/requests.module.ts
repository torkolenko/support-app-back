import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './requests.model';
import { Status } from 'src/statuses/statuses.model';
import { Type } from 'src/types/types.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request, Status, Type]), FilesModule],
})
export class RequestsModule {}
