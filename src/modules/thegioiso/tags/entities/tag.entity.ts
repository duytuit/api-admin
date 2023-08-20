import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ database: 'thegioiso.pro' })
export class Tags {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Post Id */
  @Column({
    name: 'post_id',
    comment: 'Id bài viết',
    type: 'int',
  })
  @IsNumber()
  @Type()
  @IsOptional()
  postId: number;

  /* tag */
  @Column({
    name: 'tag',
    comment: 'tag',
    default: null,
    length: 255,
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
    length: 255,
  })
  @Type()
  @IsOptional()
  @IsString()
  tagSlug: string;
}
