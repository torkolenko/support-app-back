import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATE_MESSAGES } from 'src/constant';

export class CreateStatusDto {
  @ApiProperty({
    example: 'В очереди',
    description: 'Название статуса обращения',
  })
  @IsString({ message: VALIDATE_MESSAGES.isString })
  @IsNotEmpty({ message: VALIDATE_MESSAGES.isNotEmpty })
  readonly name: string;
}
