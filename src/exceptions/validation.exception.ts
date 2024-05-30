import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { VALIDATE_MESSAGES } from 'src/constant';

export class ValidationException extends HttpException {
  @ApiProperty({
    example: VALIDATE_MESSAGES.isNotEmpty,
    description: 'Описание ошибки',
  })
  message: string;
  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
    description: 'Статус ошибки',
  })
  statusCode: number;

  constructor(response: any) {
    const statusCode = HttpStatus.BAD_REQUEST;
    response.statusCode = statusCode;
    super(response, statusCode);
    this.message = response;
    this.statusCode = statusCode;
  }
}
