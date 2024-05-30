import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Status } from 'src/statuses/statuses.model';
import { Type } from 'src/types/types.model';

interface RequestCreationAttrs {
  userName: string;
  description: string;
  typeId: number;
  image?: string;
}

@Table({ tableName: 'requests' })
export class Request extends Model<Request, RequestCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Булгакова Полина',
    description: 'Имя пользователя, отправившего обращение',
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Не работает создание отчета',
    description: 'Текст обращения',
  })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор статуса обращения',
  })
  @ForeignKey(() => Status)
  @Default(1)
  @Column({ type: DataType.INTEGER, allowNull: false })
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор типа обращения',
  })
  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId: number;

  @BelongsTo(() => Type)
  type: Type;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2024-05-27T03:50:41.644Z',
    description: 'Момент создания',
  })
  createdAt: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2024-05-27T03:50:41.644Z',
    description: 'Момент последнего обновления',
  })
  updatedAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({
    required: false,
    example: '1.jpg',
    description: 'Прикрепленный файл',
  })
  image: string; //храним уникальное название файла
}
