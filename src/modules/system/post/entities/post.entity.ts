import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
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
  status: string;

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.posts)
  users: User[];
}
