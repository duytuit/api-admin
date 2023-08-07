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

  /* Slug */
  @Column({
    name: 'slug',
    comment: 'slug danh mục',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  slug: string;

  /* Mô tả */
  @Column({
    name: 'desc',
    comment: 'mô tả',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  desc: string;

  /* Link */
  @Column({
    name: 'link_external',
    comment: 'link external',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  @Type()
  linkExternal: string;

  /* Type */
  @Column({
    name: 'type',
    comment: 'kiểu danh mục',
    default: null,
  })
  @Type()
  @IsNumber()
  type: number;

  /* Image */
  @Column({
    name: 'image',
    comment: 'ảnh',
    default: null,
  })
  @IsString()
  @IsOptional()
  image: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  /* Danh mục cha Id */
  @Column({
    name: 'parent_id',
    comment: 'Danh mục cha',
    default: 0,
    type: 'integer',
  })
  @IsNumber()
  @IsOptional()
  parentId: number;

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
