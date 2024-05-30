import { Injectable } from '@nestjs/common';
import { Request } from './requests.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestDto } from './dto/create-request.dto';
import { FilesService } from 'src/files/files.service';
import { Status } from 'src/statuses/statuses.model';
import { Type } from 'src/types/types.model';
import { QueryRequestDto } from './dto/params-request.dto';
import { Op } from 'sequelize';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private requestRepository: typeof Request,
    private fileService: FilesService,
  ) {}

  async createRequest(dto: CreateRequestDto, image: any) {
    let fileName;

    if (image) {
      fileName = await this.fileService.createFile(image);
    }
    const request = await this.requestRepository.create({
      ...dto,
      image: fileName,
    });

    const requestWithStatusInfo = await this.requestRepository.findByPk(
      request.id,
      { include: [{ model: Status }, { model: Type }] },
    );

    return requestWithStatusInfo;
  }

  async getAllRequests(params: QueryRequestDto) {
    let { limit, page, createdAt, ...otherFilterParams } = params;
    limit = limit || 20;
    page = page || 1;
    const offset = limit * page - limit;

    let requests;

    if (createdAt) {
      const minDate = new Date(createdAt);
      const maxDate = new Date(createdAt);
      maxDate.setDate(maxDate.getDate() + 1);

      requests = await this.requestRepository.findAndCountAll({
        where: {
          ...otherFilterParams,
          createdAt: { [Op.gte]: minDate, [Op.lt]: maxDate },
        },
        limit,
        offset,
        include: [{ model: Status }, { model: Type }],
      });

      return requests;
    }

    requests = await this.requestRepository.findAndCountAll({
      where: {
        ...otherFilterParams,
      },
      limit,
      offset,
      include: [{ model: Status }, { model: Type }],
    });

    return requests;
  }

  async getOneRequest(requestId: number) {
    const request = await this.requestRepository.findByPk(requestId, {
      include: [{ model: Status }, { model: Type }],
    });

    return request;
  }
}
