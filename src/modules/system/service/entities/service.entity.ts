import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { text } from 'stream/consumers';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Service extends BaseEntity {
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
    comment: 'Tên dịch vụ',
    length: 500,
  })
  @IsString()
  name: string;

  /* Service Code */
  @Column({
    name: 'service_code',
    comment: 'Mã dịch vụ',
    length: 500,
  })
  @IsString()
  serviceCode: string;

  /* Description */
  @Column({
    name: 'desc_detail',
    comment: 'mô tả chi tiết',
    type: 'text',
  })
  @IsString()
  desc_detail: string;

  /* price */
  @Column({
    name: 'price',
    comment: 'Giá',
    type: 'double',
    default: null,
  })
  @Type()
  @IsOptional()
  price: number;

  /* type */
  @Column({
    name: 'type',
    comment: 'type',
    default: null,
  })
  @Type()
  @IsOptional()
  type: number;

  /* Category Id */
  @Column({
    name: 'category_id',
    comment: 'Id danh mục',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  categoryId: number;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  @Column({
    name: 'status',
    comment: 'Trạng thái',
    default: 0,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  status: number;
}
