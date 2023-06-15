import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
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

  /* Link */
  @Column({
    name: 'link_external',
    comment: 'link external',
    default: null,
  })
  @IsString()
  @Type()
  linkExternal: string;

  /* Thumnail */
  @Column({
    name: 'image_thumnail',
    comment: 'Ảnh',
    default: null,
  })
  @IsString()
  @Type()
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
  rated: string | null;

  /* Category Id */
  @Column({
    name: 'category_id',
    comment: 'Id danh mục',
    default: null,
  })
  @IsNumber()
  @Type()
  categoryId: number | null;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number | null;

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
