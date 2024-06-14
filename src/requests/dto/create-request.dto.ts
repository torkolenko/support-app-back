import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VALIDATE_MESSAGES } from 'src/constant';

export class CreateRequestDto {
  @ApiProperty({
    example: 'Булгакова Полина',
    description: 'Имя пользователя, отправившего обращение',
  })
  @IsString({ message: VALIDATE_MESSAGES.isString })
  @IsNotEmpty({ message: VALIDATE_MESSAGES.isNotEmpty })
  readonly userName: string;

  @ApiProperty({
    example: 'Не работает создание отчета',
    description: 'Текст обращения',
  })
  @IsString({ message: VALIDATE_MESSAGES.isString })
  @IsNotEmpty({ message: VALIDATE_MESSAGES.isNotEmpty })
  readonly description: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор типа обращения',
  })
  @Transform(({ value }) => +value)
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  @IsNotEmpty({ message: VALIDATE_MESSAGES.isNotEmpty })
  readonly typeId: number;

  @ApiProperty({
    description: 'Загружаемый файл',
    required: false,
    format: 'binary',
  })
  readonly image: string;
}
