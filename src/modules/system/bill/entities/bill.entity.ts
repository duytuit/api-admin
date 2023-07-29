import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { text } from 'stream/consumers';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Bill Code */
  @Column({
    name: 'bill_code',
    comment: 'Mã hóa đơn',
    length: 500,
  })
  @IsString()
  billCode: string;

  /* Description */
  @Column({
    name: 'desc_detail',
    comment: 'mô tả chi tiết',
    type: 'text',
    default: null,
  })
  @IsString()
  @IsOptional()
  desc_detail: string;

  /* cost */
  @Column({
    name: 'cost',
    comment: 'Giá',
    type: 'double',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  cost: string;

  /* cycle name */
  @Column({
    name: 'cycle_name',
    comment: 'cycle_name',
    default: null,
  })
  @Type()
  @IsOptional()
  cycleName: number;

  /* customer name */
  @Column({
    name: 'customer_name',
    comment: 'customer_name',
    default: null,
  })
  @Type()
  @IsOptional()
  customerName: string;

  /* phone */
  @Column({
    name: 'phone',
    comment: 'phone',
    default: null,
    length: 20,
  })
  @Type()
  @IsOptional()
  phone: string;

  /* email */
  @Column({
    name: 'email',
    comment: 'email',
    default: null,
    length: 200,
  })
  @Type()
  @IsOptional()
  email: string;

  /* customer address */
  @Column({
    name: 'customer_address',
    comment: 'customer_address',
    default: null,
  })
  @Type()
  @IsOptional()
  customerAddress: string;

  /* attach file */
  @Column({
    name: 'attach',
    comment: 'attach',
    default: null,
  })
  @Type()
  @IsOptional()
  attach: string;

  /* dead line */
  @Column({
    name: 'dead_line',
    comment: 'dead_line',
    default: null,
    type: 'date',
  })
  @Type()
  @IsOptional()
  deadLine: string;

  /* VAT */
  @Column({
    name: 'is_vat',
    comment: 'is_vat',
    default: null,
    type: 'double',
  })
  @Type()
  @IsOptional()
  isVat: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  /* approved Id */
  @Column({
    name: 'approved_id',
    comment: 'Id người duyệt',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  approvedId: number;

  /* sender Id */
  @Column({
    name: 'sender_id',
    comment: 'Id người gửi thông báo',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  senderId: number;

  @Column({
    name: 'status',
    comment: 'Trạng thái',
    default: 0,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  status: number;
}
