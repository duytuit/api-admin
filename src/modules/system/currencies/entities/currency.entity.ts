import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Name */
  @Column({
    name: 'name',
    comment: 'Tên danh mục',
    length: 500,
  })
  @IsString()
  name: string;

  /* Symbol */
  @Column({
    name: 'symbol',
    comment: 'symbol',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  symbol: string;

  /* Tỷ giá */
  @Column({
    name: 'exchange_rate',
    comment: 'Quy đổi',
    default: 0,
    type: 'double',
  })
  @IsString()
  @IsOptional()
  exchange_rate: number;

  @Column({
    name: 'status',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'tinyint',
    default: 0,
  })
  @Type()
  @IsNumber()
  @IsOptional()
  status: number;
}
