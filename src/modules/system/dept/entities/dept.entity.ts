import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Tree('materialized-path')
export class Dept extends BaseEntity {
  /*  ID bộ phận */
  @PrimaryGeneratedColumn({
    name: 'dept_id',
    comment: 'ID bộ phận',
    type: 'int',
  })
  @Type()
  @IsNumber()
  deptId: number;

  /* Tên bộ phận */
  @Column({
    name: 'dept_name',
    comment: 'Tên bộ phận',
    default: '',
    length: 50,
  })
  @IsString()
  deptName: string;

  /*Hiển thị thứ tự  */
  @Column({
    name: 'order_num',
    comment: 'Hiển thị thứ tự',
    default: 0,
  })
  @IsNumber()
  orderNum: number;

  /* hiệu trưởng */
  @Column({
    name: 'leader',
    comment: 'hiệu trưởng',
    length: 20,
    default: null,
  })
  @IsOptional()
  @IsString()
  leader?: string;

  /* số liên lạc */
  @Column({
    name: 'phone',
    comment: 'số liên lạc',
    length: 11,
    default: null,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  /* Email */
  @Column({
    name: 'email',
    comment: 'Email',
    length: 50,
    default: null,
  })
  @IsOptional()
  @IsString()
  email?: string;

  /* Trạng thái */
  @Column({
    name: 'status',
    comment: 'Trạng thái(0 bình thường 1 vô hiệu hóa)',
    length: 1,
    default: '0',
    type: 'char',
  })
  @IsString()
  status: string;

  @ApiHideProperty()
  @Column({
    name: 'del_flag',
    comment: 'Xoá Ký hiệu (0 đại diện cho 2 đại diện cho xoá)',
    length: 1,
    default: '0',
    type: 'char',
  })
  delFlag: string;

  @ApiHideProperty()
  @TreeChildren()
  children: Dept[];

  @ApiHideProperty()
  @TreeParent()
  parent: Dept;

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.depts)
  roles: Role[];

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.dept)
  users: User[];
}
