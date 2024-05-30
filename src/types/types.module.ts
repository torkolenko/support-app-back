import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from 'src/requests/requests.model';
import { Type } from './types.model';

@Module({
  providers: [TypesService],
  controllers: [TypesController],
  imports: [SequelizeModule.forFeature([Request, Type])],
})
export class TypesModule {}
