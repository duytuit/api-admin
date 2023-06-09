import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ChapterDetail extends BaseEntity {
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
    comment: 'Tên chương',
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

  /* Image */
  @Column({
    name: 'images',
    comment: 'ảnh',
    default: null,
    type: 'longtext',
  })
  @IsString()
  images: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  /* Product Detail Id */
  @Column({
    name: 'product_detail_id',
    comment: 'Id chi tiết sản phẩm',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  productDetailId: number | null;

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
