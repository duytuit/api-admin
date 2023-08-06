import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  /* post ID */
  @PrimaryGeneratedColumn({
    name: 'post_id',
    comment: 'post ID',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'Đăng ID',
  })
  postId: number;

  /* Mã bài viết */
  @Column({
    unique: true,
    name: 'post_code',
    comment: 'Mã bài viết',
    length: 64,
  })
  @IsString()
  @Excel({
    name: 'Mã bài viết',
  })
  postCode: string;

  /* Tên vị trí */
  @Column({
    name: 'post_name',
    comment: 'Tên vị trí',
    length: 50,
  })
  @IsString()
  @Excel({
    name: 'Tên vị trí',
  })
  postName: string;

  /* Tên*/
  @Column({
    name: 'name',
    comment: 'Tên',
    default: null,
  })
  @IsString()
  @IsOptional()
  name: string;

  /* Slug */
  @Column({
    name: 'slug',
    comment: 'Slug',
    default: null,
  })
  @IsString()
  @IsOptional()
  slug: string;
  /* Summary */
  @Column({
    name: 'summary',
    comment: 'summary',
    default: null,
  })
  @IsString()
  @IsOptional()
  summary: string;

  /* Keywords */
  @Column({
    name: 'keywords',
    comment: 'keywords',
    default: null,
  })
  @IsString()
  @IsOptional()
  keywords: string;
  /* Tags */
  @Column({
    name: 'tags',
    comment: 'tags',
    default: null,
  })
  @IsString()
  @IsOptional()
  tags: string;

  /* Image */
  @Column({
    name: 'image',
    comment: 'Image',
    default: null,
  })
  @IsString()
  @IsOptional()
  image: string;

  /* is_picked */
  @Column({
    name: 'is_picked',
    comment: 'is_picked',
    default: null,
  })
  @IsString()
  @IsOptional()
  is_picked: string;

  /* need_auth */
  @Column({
    name: 'need_auth',
    comment: 'need_auth',
    default: null,
  })
  @IsString()
  @IsOptional()
  need_auth: string;

  /* Category Id */
  @Column({
    name: 'category_id',
    comment: 'Id danh mục',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  categoryId: number;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  /* Description */
  @Column({
    name: 'description',
    comment: 'description',
    default: null,
    type: 'longtext',
  })
  @IsString()
  @IsOptional()
  description: string;

  /* Hiển thị thứ tự */
  @Column({
    name: 'post_sort',
    comment: 'Hiển thị thứ tự',
  })
  @IsNumber()
  @Excel({
    name: 'Hiển thị thứ tự',
  })
  postSort: number;

  /* Trạng thái(0 bình thường 1 điểm dừng */
  @Column({
    name: 'status',
    comment: 'Trạng thái（0 bình thường 1 vô hiệu hóa)',
    length: 1,
    type: 'char',
  })
  @IsString()
  @Excel({
    name: 'Trạng thái',
    dictType: 'sys_normal_disable',
  })
  status: number;

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.posts)
  users: User[];
}
