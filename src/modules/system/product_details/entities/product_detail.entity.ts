import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductDetail extends BaseEntity {
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
    default: null,
  })
  @IsString()
  @Type()
  name: string;

  /* Thumnail */
  @Column({
    name: 'image_thumnail',
    comment: 'Ảnh',
    default: null,
    type: 'longtext',
  })
  @IsString()
  @Type()
  @IsOptional()
  imageThumnail: string;

  /* travellerImages */

  @Column({
    name: 'traveller_images',
    comment: 'Ảnh',
    type: 'longtext',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  travellerImages: string;

  /* Release */
  @Column({
    name: 'release',
    comment: 'Xuất bản',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  release: string;

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

  /* Short Description */
  @Column({
    name: 'short_description',
    comment: 'Mô tả ngắn',
    type: 'text',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  shortDescription: string;

  /*Description */
  @Column({
    name: 'description',
    comment: 'Mô tả',
    type: 'longtext',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  description: string;

  /* Chapters */
  @Column({
    name: 'chapters',
    comment: 'Chương',
    type: 'longtext',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  chapters: string;

  /* genres */
  @Column({
    name: 'genres_id',
    comment: 'ID thể loại',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  genresId: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  /* Product Id */
  @Column({
    name: 'product_id',
    comment: 'Id sản phẩm',
    default: null,
  })
  @IsNumber()
  @Type()
  productId: number | null;

  @Column({
    name: 'status',
    comment: 'Trạng thái',
    default: 0,
  })
  @IsNumber()
  @Type()
  status: number;

  @Column({
    name: 'public',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'tinyint',
    default: 0,
  })
  @Type()
  @IsNumber()
  public: number;
}
