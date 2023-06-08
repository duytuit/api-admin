import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'config',
})
export class SysConfig extends BaseEntity {
  /* Phím tham số */
  @PrimaryGeneratedColumn({
    name: 'config_id',
    comment: 'Phím tham số',
  })
  @IsNumber()
  @Excel({
    name: 'Phím tham số',
  })
  configId: number;

  /* Tên tham số */
  @Column({
    name: 'config_name',
    length: 100,
    default: '',
    comment: 'Tên tham số',
  })
  @IsString()
  @Excel({
    name: 'Tên tham số',
  })
  configName: string;

  /* Tên khóa tham số */
  @Column({
    name: 'config_key',
    length: 100,
    default: '',
    comment: 'Tên khóa tham số',
  })
  @Excel({
    name: 'Tên khóa tham số',
  })
  @IsString()
  configKey: string;

  /* Giá trị khóa tham số */
  @Column({
    name: 'config_value',
    length: 500,
    default: '',
    comment: 'Giá trị khóa tham số',
  })
  @IsString()
  @Excel({
    name: 'Giá trị khóa tham số',
  })
  configValue: string;

  /* Hệ thống được xây dựng -in (y là n hoặc không) */
  @Column({
    name: 'config_type',
    type: 'char',
    length: 1,
    default: 'N',
    comment: 'Hệ thống được xây dựng -in (y là n hoặc không)',
  })
  @Excel({
    name: 'Hệ thống xây dựng -in',
    dictType: 'sys_yes_no',
  })
  @IsString()
  configType: string;
}
