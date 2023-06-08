import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DictType } from './dict_type.entity';

@Entity({
  name: 'dict_data',
})
export class DictData extends BaseEntity {
  /* Từ điển */
  @PrimaryGeneratedColumn({
    name: 'dict_data',
    comment: 'Từ điển',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'Từ điển',
  })
  dictCode: number;

  /* Từ điển */
  @Column({
    name: 'dict_sort',
    comment: 'Từ điển',
    default: 0,
  })
  @IsNumber()
  @Excel({
    name: 'Từ điển',
  })
  dictSort: number;

  /* Nhãn từ điển */
  @Column({
    name: 'dict_label',
    length: '100',
    default: '',
    comment: 'Nhãn từ điển',
  })
  @IsString()
  @Excel({
    name: 'Nhãn từ điển',
  })
  dictLabel: string;

  /* Giá trị khóa từ điển */
  @Column({
    name: 'dict_value',
    length: '100',
    default: '',
    comment: 'Giá trị khóa từ điển',
  })
  @IsString()
  @Excel({
    name: 'Giá trị khóa từ điển',
  })
  dictValue: string;

  /* Thuộc tính kiểu (phần mở rộng kiểu khác) */
  @Column({
    name: 'css_class',
    length: '100',
    nullable: true,
    default: null,
    comment: 'Thuộc tính kiểu (phần mở rộng kiểu khác)',
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: 'Thuộc tính kiểu (phần mở rộng kiểu khác)',
  })
  cssClass?: string;

  /* BẢNG BACK */
  @Column({
    name: 'list_class',
    length: '100',
    nullable: true,
    default: null,
    comment: 'BẢNG BACK',
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: 'BẢNG BACK',
  })
  listClass?: string;

  /* Có mặc định không (y là n hoặc n) */
  @Column({
    name: 'is_default',
    length: '1',
    type: 'char',
    default: 'N',
    comment: 'Có mặc định không (y là n hoặc n)',
  })
  @IsOptional()
  @IsString()
  isDefault?: string;

  /* Trạng thái(0 bình thường 1 vô hiệu hóa) */
  @Column({
    length: '1',
    type: 'char',
    default: '0',
    comment: 'Trạng thái（0 bình thường 1 vô hiệu hóa)',
  })
  @Excel({
    name: 'Trạng thái',
    dictType: 'sys_normal_disable',
  })
  @IsString()
  status: string;

  /* Từ điển */
  @ManyToOne(() => DictType, (dictType) => dictType.dictDatas)
  dictType: DictType;
}
