import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { ExcelTypeEnum } from 'src/modules/common/excel/excel.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dept } from '../../dept/entities/dept.entity';
import { Post } from '../../post/entities/post.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  /* Tên người dùng */
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: 'Tên người dùng',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'Tên người dùng',
    type: ExcelTypeEnum.EXPORT,
  })
  userId: number;

  /* tài khoản người dùng */
  @Column({
    name: 'user_name',
    comment: 'tài khoản người dùng',
    length: 30,
  })
  @IsString()
  @Excel({
    name: 'tài khoản người dùng',
  })
  userName: string;

  /* Biệt danh */
  @Column({
    name: 'nick_name',
    comment: 'Biệt danh',
    length: 30,
  })
  @IsString()
  @Excel({
    name: 'Biệt danh',
  })
  nickName: string;

  /* Loại người dùng */
  @Column({
    name: 'user_type',
    comment: 'Loại người dùng (00 Người dùng hệ thống)',
    length: 2,
    default: '00',
  })
  @IsOptional()
  @IsString()
  userType?: string;

  /* Hộp thư người dùng */
  @Column({
    comment: 'Hộp thư người dùng',
    length: 50,
    default: null,
  })
  @IsOptional()
  @IsString()
  email?: string;

  /* SĐT */
  @Column({
    comment: 'SĐT',
    length: 11,
    default: null,
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: 'SĐT',
  })
  phonenumber?: string;

  @Column({
    comment: 'Giới tính của người dùng (0 nam, 1 nữ 2 không xác định)',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsOptional()
  @IsString()
  sex: string;

  /* Địa chỉ avatar */
  @Column({
    comment: 'Địa chỉ avatar',
    length: 100,
    default: '',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  /* mật khẩu mở khóa */
  @Column({
    comment: 'mật khẩu mở khóa',
    length: 100,
    default: '',
    select: false,
  })
  @Excel({
    type: ExcelTypeEnum.IMPORT,
    name: 'mật khẩu mở khóa',
  })
  @IsString()
  password: string;

  @ApiHideProperty()
  @Column({
    comment: 'Mã hóa muối',
    length: 100,
    default: '',
    select: false,
  })
  salt: string;

  /* số tài khoản Trạng thái */
  @Column({
    comment: 'số tài khoản Trạng thái（0 bình thường 1 vô hiệu hóa)',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsString()
  @IsString()
  @Excel({
    name: 'số tài khoản Trạng thái',
    dictType: 'sys_normal_disable',
  })
  status: string;

  @ApiHideProperty()
  @Column({
    name: 'del_flag',
    comment: 'Xoá Ký hiệu (0 đại diện cho 2 đại diện cho xoá)',
    type: 'char',
    length: 1,
    default: '0',
  })
  delFlag: string;

  /* IP đăng nhập cuối cùng */
  @Column({
    name: 'login_ip',
    comment: 'IP đăng nhập cuối cùng',
    length: 128,
    default: '',
  })
  @IsOptional()
  @IsString()
  loginIp?: string;

  /* Thời gian đăng nhập cuối cùng */
  @Column({
    name: 'login_date',
    comment: 'Thời gian đăng nhập cuối cùng',
    default: null,
  })
  @IsOptional()
  @IsString()
  loginDate?: Date;

  @ApiHideProperty()
  @ManyToOne(() => Dept, (dept) => dept.users)
  dept: Dept;

  @ApiHideProperty()
  @ManyToMany(() => Post, (post) => post.users)
  @JoinTable()
  posts: Post[];

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
