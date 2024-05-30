import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsInt,
} from 'class-validator';
import { VALIDATE_MESSAGES } from 'src/constant';
import { toDate, toNumber } from 'src/helper';

export class QueryRequestDto {
  @Transform(({ value }) => toNumber(value))
  @IsPositive({ message: VALIDATE_MESSAGES.isPositive })
  @IsInt({ message: VALIDATE_MESSAGES.isInt })
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  @IsOptional()
  public limit: number;

  @Transform(({ value }) => toNumber(value))
  @IsPositive({ message: VALIDATE_MESSAGES.isPositive })
  @IsInt({ message: VALIDATE_MESSAGES.isInt })
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  @IsOptional()
  public page: number;

  @IsString({ message: VALIDATE_MESSAGES.isString })
  @IsOptional()
  public userName: string;

  @Transform(({ value }) => toNumber(value))
  @IsPositive({ message: VALIDATE_MESSAGES.isPositive })
  @IsInt({ message: VALIDATE_MESSAGES.isInt })
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  @IsOptional()
  public typeId: number;

  @Transform(({ value }) => toNumber(value))
  @IsPositive({ message: VALIDATE_MESSAGES.isPositive })
  @IsInt({ message: VALIDATE_MESSAGES.isInt })
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  @IsOptional()
  public statusId: number;

  @Transform(({ value }) => toDate(value))
  @IsDate({ message: VALIDATE_MESSAGES.isDate })
  @IsOptional()
  public createdAt: Date;
}

export class RouteRequestParams {
  @Transform(({ value }) => toNumber(value))
  @IsNumber({}, { message: VALIDATE_MESSAGES.isNumber })
  public id: number;
}
