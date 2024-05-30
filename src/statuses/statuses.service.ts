import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './statuses.model';

@Injectable()
export class StatusesService {
  constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

  async createStatus(dto: CreateStatusDto) {
    const status = await this.statusRepository.create(dto);
    return status;
  }

  async getAllStatuses() {
    const statuses = await this.statusRepository.findAll();
    return statuses;
  }
}
