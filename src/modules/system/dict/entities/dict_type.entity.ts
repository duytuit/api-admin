import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DictData } from './dict_data.entity';

@Entity({
  name: 'dict_type',
})
export class DictType extends BaseEntity {
  /* Từ điển */
  @PrimaryGeneratedColumn({
    name: 'dict_id',
    comment: 'Loại từ điển id',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'Từ điển',
  })
  dictId: number;

  /* Tên từ điển */
  @Column({
    name: 'dict_name',
    comment: 'Tên từ điển',
    default: '',
    length: 100,
  })
  @IsString()
  @Excel({
    name: 'Tên từ điển',
  })
  dictName: string;

  /* Từ điển */
  @Column({
    unique: true,
    name: 'dict_type',
    comment: 'Từ điển',
    default: '',
    length: 100,
  })
  @IsString()
  @Excel({
    name: 'Từ điển',
  })
  dictType: string;

  /* Trạng thái(0 bình thường 1 vô hiệu hóa) */
  @Column({
    comment: 'Trạng thái（0 bình thường 1 vô hiệu hóa)',
    type: 'char',
    default: 0,
    length: 1,
  })
  @Excel({
    name: 'Trạng thái',
    dictType: 'sys_normal_disable',
  })
  @IsString()
  status: string;

  @OneToMany(() => DictData, (dictData) => dictData.dictType)
  @ApiHideProperty()
  dictDatas: DictData[];
}
