import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ database: 'thegioiso.pro' })
export class Post_Images {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* post_id */
  @Column({
    name: 'post_id',
    comment: 'Bài viết ID',
    default: 0,
    type: 'int',
  })
  @Type()
  @IsNumber()
  postId: number;
  /* Image Path */
  @Column({
    name: 'image_path',
    comment: 'đường dẫn tệp',
    length: 500,
  })
  @IsString()
  @IsOptional()
  imagePath: string;
}
