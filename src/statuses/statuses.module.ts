import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './statuses.model';
import { Request } from 'src/requests/requests.model';

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [SequelizeModule.forFeature([Request, Status])],
})
export class StatusesModule {}
