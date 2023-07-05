import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Campain extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* title */
  @Column({
    name: 'title',
    comment: 'tiêu để',
    default: null,
    type: 'longtext',
  })
  @IsString()
  @IsOptional()
  title: string;

  /* type */
  @Column({
    name: 'type',
    comment: 'kiểu chiến dịch thông báo',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  type: number;

  /*  type Id */
  @Column({
    name: 'type_id',
    comment: 'Mã model',
    default: null,
  })
  @Type()
  @IsOptional()
  type_id: number;

  /* total */
  @Column({
    name: 'total',
    comment: 'total',
    default: null,
  })
  @Type()
  @IsOptional()
  total: string;

  /* status*/
  @Column({
    name: 'status',
    comment: 'trạng thái thông báo',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  status: string;

  /* run */
  @Column({
    name: 'run',
    comment: 'trạng thái hoàn thành',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  run: number;

  /* sms sended */
  @Column({
    name: 'sms_sended',
    comment: 'số lượng đã gửi sms',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  smsSended: number;

  /* email sended */
  @Column({
    name: 'email_sended',
    comment: 'số lượng đã gửi email',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  emailSended: number;

  /* app sended */
  @Column({
    name: 'app_sended',
    comment: 'số lượng đã gửi app',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  appSended: number;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  projectId: number;
}
