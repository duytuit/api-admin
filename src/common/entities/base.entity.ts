/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:06:20
 * @LastEditTime: 2022-10-27 22:53:37
 * @LastEditors: Please set LastEditors
 * @Description: Cơ sở dữ liệu
 * @FilePath: /meimei-admin/src/common/entities/base.entity.ts
 * You can you up，no can no bb！！
 */
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { ExcelTypeEnum } from 'src/modules/common/excel/excel.enum';
import { Type } from 'class-transformer';

export class BaseEntity {
  /* Thời gian */
  @CreateDateColumn({ name: 'create_time', comment: 'Thời gian' })
  @ApiHideProperty()
  @Excel({
    name: 'Thời gian',
    type: ExcelTypeEnum.EXPORT,
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    sort: 100,
  })
  createTime: Date | string;

  /* Cập nhật thời gian */
  @UpdateDateColumn({ name: 'update_time', comment: 'Cập nhật thời gian' })
  @ApiHideProperty()
  updateTime: Date | string;

  /* người sáng lập */
  @Column({
    name: 'create_by',
    comment: 'người sáng lập',
    length: 30,
    default: null,
  })
  @ApiHideProperty()
  @Excel({
    name: 'người sáng lập',
    type: ExcelTypeEnum.EXPORT,
    sort: 101,
  })
  createBy: string;

  /* Cập nhật */
  @Column({ name: 'update_by', comment: 'Cập nhật', length: 30, default: null })
  @ApiHideProperty()
  updateBy: string;

  /* ID user last time update */

  @Column({
    name: 'last_update_user_id',
    comment: 'ID người cập nhật cuối cùng',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  lastUpdateUserId: number | null;

  /* Nhận xét */
  @Column({ name: 'remark', comment: 'Nhận xét', default: null })
  @IsOptional()
  @IsString()
  @Excel({
    name: 'Nhận xét',
    sort: 102,
  })
  remark?: string;

  /*Số phiên bản (nó sẽ được tăng lên khi chèn hoặc cập nhật) */
  @VersionColumn({ name: 'version', comment: 'số phiên bản', select: false })
  @ApiHideProperty()
  version?: number;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt: Date;
}
