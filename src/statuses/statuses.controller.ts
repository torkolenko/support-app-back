import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusesService } from './statuses.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './statuses.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { MyInternalServerException } from 'src/exceptions/internalServer.exception';
import { ValidationException } from 'src/exceptions/validation.exception';

@ApiTags('Статусы обращений')
@Controller('statuses')
export class StatusesController {
  constructor(private statusesService: StatusesService) {}

  @ApiOperation({ summary: 'Создание нового статуса' })
  @ApiResponse({ status: 200, type: Status })
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
  create(@Body() statusDto: CreateStatusDto) {
    return this.statusesService.createStatus(statusDto);
  }

  @ApiOperation({
    summary: 'Получение массива статусов',
  })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: MyInternalServerException,
  })
  @Get()
  getAll() {
    return this.statusesService.getAllStatuses();
  }
}
