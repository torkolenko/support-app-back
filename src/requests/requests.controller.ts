import { Status } from 'src/statuses/statuses.model';
import { Request } from 'src/requests/requests.model';
import { Type } from 'src/types/types.model';

import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsNumber } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';
import { MyInternalServerException } from 'src/exceptions/internalServer.exception';
import { MyNotFoundException } from 'src/exceptions/notFound.exception';
import { QueryRequestDto, RouteRequestParams } from './dto/params-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Обращения пользователей')
@ApiExtraModels(Request, Type, Status)
@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @ApiOperation({ summary: 'Создание обращения пользователя' })
  @ApiResponse({
    status: 200,
    schema: {
      allOf: [
        { $ref: getSchemaPath(Request) },
        {
          properties: {
            type: {
              items: { $ref: getSchemaPath(Type) },
            },
            status: {
              items: { $ref: getSchemaPath(Status) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ValidationException,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: MyInternalServerException,
  })
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() requestDto: CreateRequestDto, @UploadedFile() image: any) {
    return this.requestsService.createRequest(requestDto, image);
  }

  @ApiOperation({ summary: 'Получение массива обращений' })
  @ApiQuery({
    name: 'limit',
    description: 'Количество получаемых значений',
  })
  @ApiQuery({
    name: 'page',
    description: 'Номер страницы на front-end',
  })
  @ApiQuery({
    name: 'userName',
    description: 'Имя пользователя, отправившего обращение (для фильтрации)',
    required: false,
  })
  @ApiQuery({
    name: 'statusId',
    description: 'id статуса обращения (для фильтрации)',
    required: false,
  })
  @ApiQuery({
    name: 'typeId',
    description: 'id типа обращения (для фильтрации)',
    required: false,
  })
  @ApiQuery({
    name: 'createdAt',
    description: 'Дата (для фильтрации)',
    required: false,
  })
  @ApiResponse({
    status: 200,
    schema: {
      allOf: [
        { $ref: getSchemaPath(Request) },
        {
          properties: {
            type: {
              items: { $ref: getSchemaPath(Type) },
            },
            status: {
              items: { $ref: getSchemaPath(Status) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ValidationException,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: MyInternalServerException,
  })
  @UsePipes(ValidationPipe)
  @Get()
  getAll(
    @Query()
    params: QueryRequestDto,
  ) {
    return this.requestsService.getAllRequests(params);
  }

  @ApiParam({
    name: 'id',
    description: 'id обращения',
  })
  @ApiResponse({
    status: 200,
    schema: {
      allOf: [
        { $ref: getSchemaPath(Request) },
        {
          properties: {
            type: {
              items: { $ref: getSchemaPath(Type) },
            },
            status: {
              items: { $ref: getSchemaPath(Status) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ValidationException,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: MyInternalServerException,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: MyNotFoundException,
  })
  @UsePipes(ValidationPipe)
  @Get(':id')
  @IsNumber({}, { message: 'значение не является числом' })
  async getOne(@Param() params: RouteRequestParams) {
    const request = await this.requestsService.getOneRequest(params.id);

    if (!request) {
      const e = new HttpException(
        `Обращение с id = ${params.id} не было найдено.`,
        HttpStatus.NOT_FOUND,
      );

      throw e;
    }

    return request;
  }
}
