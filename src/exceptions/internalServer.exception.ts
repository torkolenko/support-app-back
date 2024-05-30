import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class MyInternalServerException {
  @ApiProperty({
    example: 'Internal server error',
    description: 'Описание ошибки',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Статус ошибки',
  })
  statusCode: number;
}
