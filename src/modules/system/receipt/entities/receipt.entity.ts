import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { text } from 'stream/consumers';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Receipt extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Receipt Code */
  @Column({
    name: 'receipt_code',
    comment: 'Mã biên lai',
    length: 500,
  })
  @IsString()
  receitpCode: string;

  /* Description */
  @Column({
    name: 'desc_detail',
    comment: 'mô tả chi tiết',
    type: 'text',
  })
  @IsString()
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
    length: 20,
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

  /* type */
  @Column({
    name: 'type',
    comment: 'type',
    default: null,
    type: 'tinyint',
  })
  @Type()
  @IsOptional()
  type: number;

  /* type payment */
  @Column({
    name: 'type_payment',
    comment: 'type_payment',
    default: null,
    type: 'tinyint',
  })
  @Type()
  @IsOptional()
  typePayment: number;

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

  /* bill Id */
  @Column({
    name: 'bill_id',
    comment: 'mã hóa đơn',
    default: null,
  })
  @Type()
  @IsOptional()
  billId: string;

  /* metadata */
  @Column({
    name: 'metadata',
    comment: 'dữ liệu thanh toán',
    default: null,
    type: 'text',
  })
  @Type()
  @IsOptional()
  metadata: string;

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
