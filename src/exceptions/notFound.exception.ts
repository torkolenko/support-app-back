import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class MyNotFoundException {
  @ApiProperty({
    example: 'Обращение с id = 1 не было найдено',
    description: 'Описание ошибки',
  })
  message: string;
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
    description: 'Статус ошибки',
  })
  statusCode: number;
}
