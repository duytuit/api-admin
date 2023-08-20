import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ database: process.env.MYSQL_DATABASE_1 })
export class Posts {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* lang_id */
  @Column({
    name: 'lang_id',
    comment: 'Ngôn ngữ',
    type: 'tinyint',
    default: 1,
  })
  @IsNumber()
  langId: number;
  /* title */
  @Column({
    name: 'title',
    comment: 'tên bài viết',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  title: string;

  /* title_slug */
  @Column({
    name: 'title_slug',
    comment: 'slug bài viết',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  titleSlug: string;

  /* title_hash */
  @Column({
    name: 'title_hash',
    comment: 'title_hash',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  titleHash: string;

  /* summary */
  @Column({
    name: 'summary',
    comment: 'summary',
    length: 1000,
    default: null,
  })
  @IsString()
  @IsOptional()
  summary: string;

  /* content */
  @Column({
    name: 'content',
    comment: 'mô tả',
    default: null,
    type: 'longtext',
  })
  @IsString()
  @IsOptional()
  content: string;

  /* keywords */
  @Column({
    name: 'keywords',
    comment: 'keywords',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  @Type()
  keywords: string;

  /* user_id */
  @Column({
    name: 'user_id',
    comment: 'user_id',
    type: 'int',
  })
  @Type()
  @IsNumber()
  userId: number;

  /* category_id */
  @Column({
    name: 'category_id',
    comment: 'category_id',
    type: 'int',
  })
  @Type()
  @IsNumber()
  categoryId: number;

  /* image_big */
  @Column({
    name: 'image_big',
    comment: 'image_big',
    length: 255,
    default: null,
  })
  @Type()
  @IsString()
  imageBig: string;

  /* image_mid */
  @Column({
    name: 'image_mid',
    comment: 'image_mid',
    length: 255,
    default: null,
  })
  @Type()
  @IsString()
  imageMid: string;

  /* image_small */
  @Column({
    name: 'image_small',
    comment: 'image_small',
    length: 255,
    default: null,
  })
  @Type()
  @IsString()
  imageSmall: string;
  /* image_slider */
  @Column({
    name: 'image_slider',
    comment: 'image_slider',
    length: 255,
    default: null,
  })
  @Type()
  @IsString()
  imageSlider: string;

  /* image_mime */
  @Column({
    name: 'image_mime',
    comment: 'image_mime',
    length: 100,
    default: 'jpg',
  })
  @Type()
  @IsString()
  @IsOptional()
  imageMime: string;

  /* is_slider */
  @Column({
    name: 'is_slider',
    comment: 'is_slider',
    default: 0,
    type: 'tinyint',
  })
  @IsNumber()
  is_slider: number;

  /* is_picked */
  @Column({
    name: 'is_picked',
    comment: 'is_picked',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  is_picked: number;

  /* hit */
  @Column({
    name: 'hit',
    comment: 'hit',
    default: 0,
    type: 'int',
  })
  @Type()
  @IsNumber()
  hit: number;

  /* slider_order */
  @Column({
    name: 'slider_order',
    comment: 'slider_order',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  slider_order: number;

  /* optional_url */
  @Column({
    name: 'optional_url',
    comment: 'optional_url',
    length: 1000,
    default: null,
  })
  @IsString()
  @IsOptional()
  optional_url: string;

  /* post_type*/
  @Column({
    name: 'post_type',
    comment: 'post_type',
    default: 'post',
    length: 30,
  })
  @IsString()
  @Type()
  post_type: string;

  /* video_url*/
  @Column({
    name: 'video_url',
    comment: 'video_url',
    length: 1000,
    default: null,
  })
  @IsString()
  @Type()
  video_url: string;
  /* video_embed_code*/
  @Column({
    name: 'video_embed_code',
    comment: 'video_embed_code',
    length: 1000,
    default: null,
  })
  @IsString()
  @Type()
  video_embed_code: string;
  /* image_url*/
  @Column({
    name: 'image_url',
    comment: 'image_url',
    length: 1000,
    default: null,
  })
  @IsString()
  @Type()
  image_url: string;

  /* need_auth */
  @Column({
    name: 'need_auth',
    comment: 'need_auth',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  need_auth: number;
  /* feed_id */
  @Column({
    name: 'feed_id',
    comment: 'feed_id',
    type: 'int',
  })
  @Type()
  @IsNumber()
  feed_id: number;
  /* post_url*/
  @Column({
    name: 'post_url',
    comment: 'post_url',
    length: 1000,
    default: null,
  })
  @IsString()
  @Type()
  post_url: string;
  /* show_post_url */
  @Column({
    name: 'show_post_url',
    comment: 'show_post_url',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  show_post_url: number;
  /* visibility */
  @Column({
    name: 'visibility',
    comment: 'visibility',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  visibility: number;
  /* status */
  @Column({
    name: 'status',
    comment: 'status',
    default: 0,
    type: 'tinyint',
  })
  @Type()
  @IsNumber()
  status: number;
  /* link_external */
  @Column({
    name: 'link_external',
    comment: 'link_external',
    default: null,
  })
  @Type()
  @IsString()
  link_external: string;
  /* thời gian tạo*/
  @UpdateDateColumn({ name: 'created_at', comment: 'thời gian tạo' })
  @ApiHideProperty()
  createAt: Date | string;
}
