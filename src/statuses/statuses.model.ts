import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Request } from 'src/requests/requests.model';

interface StatusCreationAttrs {
  name: string;
}

@Table({ tableName: 'statuses', createdAt: false, updatedAt: false })
export class Status extends Model<Status, StatusCreationAttrs> {
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
    example: 'Выполнено',
    description: 'Название статуса обращения',
  })
  name: string;

  @HasMany(() => Request)
  requests: Request[];
}
