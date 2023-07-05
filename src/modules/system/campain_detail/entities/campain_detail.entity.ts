import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CampainDetail extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* campain id */
  @Column({
    name: 'campain_id',
    comment: 'mã thông báo chiến dịch',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  campainId: number;

  /* type */
  @Column({
    name: 'type',
    comment: 'kiểu chiến dịch thông báo',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  type: number;

  /*  type Campain */
  @Column({
    name: 'type_campain',
    comment: 'Kiểu thông báo chiến dịch',
    default: null,
  })
  @Type()
  @IsOptional()
  typeCampain: number;

  /* view */
  @Column({
    name: 'view',
    comment: 'màn hình (screen)',
    default: null,
  })
  @Type()
  @IsOptional()
  view: string;

  /* contact*/
  @Column({
    name: 'contact',
    comment: 'thông tin liên hệ',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  contact: string;

  /* reason */
  @Column({
    name: 'reason',
    comment: 'lý do thông báo',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  reason: string;

  /* content */
  @Column({
    name: 'content',
    comment: 'nội dung gửi thông báo',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  content: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;
}
