import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category extends BaseEntity {
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

  /* Link */
  @Column({
    name: 'link_external',
    comment: 'link external',
    length: 500,
    default: null,
  })
  @IsString()
  @Type()
  linkExternal: string;

  /* Type */
  @Column({
    name: 'type',
    comment: 'kiểu danh mục',
  })
  @Type()
  @IsNumber()
  @IsOptional()
  type: number;

  /* Image */
  @Column({
    name: 'image',
    comment: 'ảnh',
    default: null,
  })
  @IsString()
  image: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  projectId: number | null;

  @Column({
    name: 'status',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'tinyint',
    default: 0,
  })
  @Type()
  @IsNumber()
  status: number;
}
