import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'notice_id',
    comment: 'Thông báo ID',
  })
  @Type()
  @IsNumber()
  noticeId: number;

  @Column({
    name: 'notice_title',
    comment: 'Thông báo',
    length: 50,
  })
  @IsString()
  noticeTitle: string;

  @Column({
    name: 'notice_type',
    comment: 'Loại thông báo (1 Thông báo 2 Thông báo)',
    type: 'char',
    length: 1,
  })
  @IsString()
  noticeType: string;

  @Column({
    name: 'notice_content',
    comment: 'Nội dung thông báo',
    type: 'longtext',
    default: null,
  })
  @IsOptional()
  @Type()
  @IsString()
  noticeContent: string;

  @Column({
    name: 'status',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'char',
    default: '0',
    length: 1,
  })
  @IsString()
  status: string;
}
