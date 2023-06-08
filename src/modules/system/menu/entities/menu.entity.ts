import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
@Entity()
@Tree('materialized-path')
export class Menu extends BaseEntity {
  /* ID menu */
  @PrimaryGeneratedColumn({
    name: 'menu_id',
    comment: 'ID menu',
    type: 'int',
  })
  @Type()
  @IsNumber()
  menuId: number;

  /* Tên menu */
  @Column({
    name: 'menu_name',
    comment: 'Tên menu',
    length: 50,
  })
  @IsString()
  menuName: string;

  /* Hiển thị thứ tự */
  @Column({
    name: 'order_num',
    comment: 'Hiển thị thứ tự',
  })
  @IsNumber()
  orderNum: number;

  /* Địa chỉ định tuyến */
  @Column({
    name: 'path',
    comment: 'Địa chỉ định tuyến',
    length: 200,
    default: '',
  })
  @IsOptional()
  @IsString()
  path: string;

  /* Đường dẫn thành phần */
  @Column({
    name: 'component',
    comment: 'Đường dẫn thành phần',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  component?: string;

  /* Tham số định tuyến */
  @Column({
    name: 'query',
    comment: 'Tham số định tuyến',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  query?: string;

  /* Cho dù đó là một chuỗi bên ngoài */
  @Column({
    name: 'is_frame',
    comment: 'Cho dù đó là một liên kết bên ngoài (0 là 1 không)',
    type: 'int',
    default: 1,
  })
  @IsOptional()
  @Type()
  @IsNumber()
  isFrame: number;

  /* Có phải bộ nhớ cache */
  @Column({
    name: 'is_cache',
    comment: 'Cho dù bộ nhớ cache (0 bộ nhớ cache 1 không có bộ nhớ cache)',
    type: 'char',
    default: '0',
  })
  @IsOptional()
  @Type()
  @IsNumber()
  isCache?: number;

  /* 'Thực đơn */
  @Column({
    name: 'menu_type',
    comment: 'Loại menu (M Thư mục C Menu F Nút F)',
    length: 1,
    type: 'char',
    default: '',
  })
  @IsString()
  menuType: string;

  /* Menu trgng thái (0 hiển thị 1 ẩn) */
  @Column({
    name: 'visible',
    comment: 'Menu trgng thái (0 hiển thị 1 ẩn)',
    length: 1,
    type: 'char',
    default: '0',
  })
  @IsOptional()
  @IsString()
  visible?: string;

  /* Menu trgng thái (0 bình thường 1) */
  @Column({
    name: 'status',
    comment: 'Menu trgng thái (0 bình thường 1)',
    length: 1,
    type: 'char',
    default: '0',
  })
  @IsOptional()
  @IsString()
  status?: string;

  /* Quyền */
  @Column({
    name: 'perms',
    comment: 'Quyền',
    length: 100,
    default: null,
  })
  @IsOptional()
  @IsString()
  perms?: string;

  /* Biểu tượng menu */
  @Column({
    name: 'icon',
    comment: 'Biểu tượng menu',
    length: 100,
    type: 'char',
    default: '#',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiHideProperty()
  @TreeChildren()
  children: Menu[];

  @ApiHideProperty()
  @TreeParent()
  parent: Menu;

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
