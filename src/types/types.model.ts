import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Request } from 'src/requests/requests.model';

interface TypeCreationAttrs {
  name: string;
}

@Table({ tableName: 'types', createdAt: false, updatedAt: false })
export class Type extends Model<Type, TypeCreationAttrs> {
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
    example: 'Улучшение',
    description: 'Название типа обращения',
  })
  name: string;

  @HasMany(() => Request)
  requests: Request[];
}
