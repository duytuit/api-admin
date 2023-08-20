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
@Entity({ database: 'infinite_cms' })
export class Images {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* image_big */
  @Column({
    name: 'image_big',
    comment: 'image_big',
    length: 255,
  })
  @IsString()
  imageBig: string;

  /* image_mid */
  @Column({
    name: 'image_mid',
    comment: 'image_mid',
    length: 255,
  })
  @IsString()
  imageMid: string;
  /* image_small */
  @Column({
    name: 'image_small',
    comment: 'image_small',
    length: 255,
  })
  @IsString()
  imageSmall: string;
  /* image_slider */
  @Column({
    name: 'image_slider',
    comment: 'image_slider',
    length: 255,
  })
  @IsString()
  imageSlider: string;
  /* image_mime */
  @Column({
    name: 'image_mime',
    comment: 'image_mime',
    length: 30,
  })
  @IsString()
  imageMime: string;
  /* Name */
  @Column({
    name: 'file_name',
    comment: 'tên tệp',
    length: 255,
  })
  @IsString()
  @IsOptional()
  fileName: string;

  /* user_id */
  @Column({
    name: 'user_id',
    comment: 'Người tạo',
    default: 0,
    type: 'int',
  })
  @Type()
  @IsNumber()
  userId: number;
  /* link_external */
  @Column({
    name: 'link_external',
    comment: 'link_external',
    default: null,
  })
  @Type()
  @IsString()
  link_external: string;
}
