import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dept } from '../../dept/entities/dept.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  /* ID ký tự */
  @PrimaryGeneratedColumn({
    name: 'role_id',
    comment: 'ID ký tự',
    type: 'int',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'ID ký tự',
  })
  roleId: number;

  /* Tên vai */
  @Column({
    name: 'role_name',
    comment: 'Tên vai',
    length: 30,
  })
  @IsString()
  @Excel({
    name: 'Tên vai',
  })
  roleName: string;

  /* Chuỗi quyền ký tự */
  @Column({
    name: 'role_key',
    comment: 'Chuỗi quyền ký tự',
    length: 100,
  })
  @IsString()
  @Excel({
    name: 'Chuỗi quyền ký tự',
  })
  roleKey: string;

  /* Hiển thị thứ tự */
  @Column({
    name: 'role_sort',
    comment: 'Hiển thị thứ tự',
  })
  @IsNumber()
  @Excel({
    name: 'Hiển thị thứ tự',
  })
  roleSort: number;

  /* Phạm vi dữ liệu (1: Tất cả các quyền dữ liệu 2: Quyền dữ liệu tùy chỉnh 3: Quyền dữ liệu của trụ sở 4: Quyền dữ liệu của bộ phận này và dưới 5: Chỉ có quyền dữ liệu của chúng tôi) */
  @Column({
    name: 'data_scope',
    comment:
      'Phạm vi dữ liệu (1: Tất cả các quyền dữ liệu 2: Quyền dữ liệu tùy chỉnh 3: Quyền dữ liệu của trụ sở 4: Quyền dữ liệu của bộ phận này và dưới 5: Chỉ có quyền dữ liệu của chúng tôi)',
    length: 1,
    type: 'char',
    default: '1',
  })
  @IsOptional()
  @IsString()
  dataScope?: string;

  /* Liệu mục lựa chọn cây menu có được liên kết hay không */
  @Column({
    name: 'menu_check_strictly',
    comment: 'Liệu mục lựa chọn cây menu có được liên kết hay không',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  menuCheckStrictly: boolean;

  /* Liệu mục lựa chọn cây menu có được liên kết hay không */
  @Column({
    name: 'dept_check_strictly',
    comment: 'Liệu mục lựa chọn cây menu có được liên kết hay không',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  deptCheckStrictly: boolean;

  /* Vai trò Trạng thái（0 bình thường 1 vô hiệu hóa) */
  @Column({
    name: 'status',
    comment: 'Vai trò Trạng thái(0 bình thường 1 vô hiệu hóa)',
    length: 1,
    type: 'char',
  })
  @IsString()
  @Excel({
    name: 'Vai trò Trạng thái',
    dictType: 'sys_normal_disable',
  })
  status: string;

  @Column({
    name: 'del_flag',
    comment: 'Xoá Ký hiệu (0 đại diện cho 2 đại diện cho xoá)',
    length: 1,
    type: 'char',
    default: '0',
  })
  @ApiHideProperty()
  delFlag: string;

  @ApiHideProperty()
  @ManyToMany(() => Dept, (dept) => dept.roles)
  @JoinTable()
  depts: Dept[];

  @ApiHideProperty()
  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  menus: Menu[];

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
