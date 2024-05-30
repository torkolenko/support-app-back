import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from './types.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ValidationException } from 'src/exceptions/validation.exception';
import { MyInternalServerException } from 'src/exceptions/internalServer.exception';

@ApiTags('Типы обращений')
@Controller('types')
export class TypesController {
  constructor(private typesService: TypesService) {}

  @ApiOperation({ summary: 'Создание нового типа' })
  @ApiResponse({ status: 200, type: Type })
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
  create(@Body() typeDto: CreateTypeDto) {
    return this.typesService.createType(typeDto);
  }

  @ApiOperation({ summary: 'Получение массива типов' })
  @ApiResponse({ status: 200, type: [Type] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: MyInternalServerException,
  })
  @Get()
  getAll() {
    return this.typesService.getAllTypes();
  }
}
