import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* tag */
  @Column({
    name: 'tag',
    comment: 'tag',
    default: null,
  })
  @Type()
  @IsOptional()
  @IsString()
  tag: string;

  /* tag slug*/
  @Column({
    name: 'tag_slug',
    comment: 'tag slug',
    default: null,
  })
  @Type()
  @IsOptional()
  @IsString()
  tagSlug: string;

  /* type */
  @Column({
    name: 'type',
    comment: 'type',
    default: null,
  })
  @Type()
  @IsOptional()
  type: number;

  /* Post Id */
  @Column({
    name: 'post_id',
    comment: 'Id bài viết',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  postId: number;

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
