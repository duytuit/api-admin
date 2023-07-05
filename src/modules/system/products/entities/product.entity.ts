import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product extends BaseEntity {
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
    comment: 'Tên sản phẩm',
    length: 500,
  })
  @IsString()
  name: string;

  /* Slug */
  @Column({
    name: 'slug',
    comment: 'slug sản phẩm',
    length: 500,
    default: null,
  })
  @Type()
  @IsString()
  @IsOptional()
  slug: string;

  /* Type */
  @Column({
    name: 'type',
    comment: 'loại sản phẩm',
    default: null,
    type: 'tinyint',
  })
  @Type()
  @IsOptional()
  type: number;

  /* Price */
  @Column({
    name: 'price',
    comment: 'giá sản phẩm',
    default: null,
    type: 'double',
  })
  @Type()
  @IsOptional()
  price: number;

  /* Mô tả */
  @Column({
    name: 'desc_short',
    comment: 'mô tả',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  descShort: string;

  /* Mô tả chi tiết */
  @Column({
    name: 'desc_detail',
    comment: 'mô tả chi tiết',
    type: 'longtext',
    default: null,
  })
  @IsString()
  @IsOptional()
  @Type()
  descDetail: string;

  /* Link */
  @Column({
    name: 'link_external',
    comment: 'link external',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  linkExternal: string;

  /* Thumnail */
  @Column({
    name: 'image_thumnail',
    comment: 'Ảnh',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  imageThumnail: string;

  /* Rated */
  @Column({
    name: 'rated',
    comment: 'Đánh giá',
    default: null,
    type: 'double',
  })
  @IsNumber()
  @Type()
  @IsOptional()
  rated: string | null;

  /* Category Id */
  @Column({
    name: 'category_id',
    comment: 'Id danh mục',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  categoryId: number | null;

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

  @Column({
    name: 'public',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'tinyint',
    default: 0,
  })
  @Type()
  @IsNumber()
  @IsOptional()
  public: number;
}
