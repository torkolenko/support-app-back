import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATE_MESSAGES } from 'src/constant';

export class CreateTypeDto {
  @ApiProperty({
    example: 'Улучшение',
    description: 'Название типа обращения',
  })
  @IsString({ message: VALIDATE_MESSAGES.isString })
  @IsNotEmpty({ message: VALIDATE_MESSAGES.isNotEmpty })
  readonly name: string;
}
