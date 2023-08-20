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
@Entity({ database: 'thegioiso.pro' })
export class Categories {
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
  /* Name */
  @Column({
    name: 'name',
    comment: 'tên danh mục',
    length: 255,
    default: null,
  })
  @IsString()
  @IsOptional()
  name: string;

  /* Slug */
  @Column({
    name: 'slug',
    comment: 'slug danh mục',
    length: 255,
    default: null,
  })
  @IsString()
  @IsOptional()
  slug: string;

  /* Mô tả */
  @Column({
    name: 'description',
    comment: 'mô tả',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  description: string;

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

  /* parent_id */
  @Column({
    name: 'parent_id',
    comment: 'Đối tác',
    default: 0,
    type: 'int',
  })
  @Type()
  @IsNumber()
  parent_id: number;

  /* category_order */
  @Column({
    name: 'category_order',
    comment: 'category_order',
    type: 'smallint',
    default: null,
  })
  @IsString()
  @IsOptional()
  categoryOrder: number;

  /* show_on_menu*/
  @Column({
    name: 'show_on_menu',
    comment: 'show_on_menu',
    default: 1,
    type: 'tinyint',
  })
  @IsNumber()
  @Type()
  showOnMenu: number;
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
