import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  /* Thumnail */
  @Column({
    name: 'image_thumnail',
    comment: 'Ảnh',
    length: 500,
  })
  @IsString()
  imageThumnail: string;

  /* Rated */
  @Column({
    name: 'rated',
    comment: 'Đánh giá',
    default: null,
  })
  @IsNumber()
  @Type()
  rated: number | null;

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
