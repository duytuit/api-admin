import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { text } from 'stream/consumers';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Debit extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /*  name */
  @Column({
    name: 'name',
    comment: 'name',
    default: null,
  })
  @Type()
  @IsOptional()
  name: string;

  /* cycle name */
  @Column({
    name: 'cycle_name',
    comment: 'cycle_name',
    default: null,
  })
  @Type()
  @IsOptional()
  cycleName: number;

  /* Service ID */
  @Column({
    name: 'service_id',
    comment: 'Mã dịch vụ',
    default: null,
  })
  @IsString()
  @IsOptional()
  serviceId: number;

  /* Product ID */
  @Column({
    name: 'product_id',
    comment: 'Mã  sản phẩm',
    default: null,
  })
  @IsString()
  @IsOptional()
  productId: number;

  /* Bill ID */
  @Column({
    name: 'bill_id',
    comment: 'Mã hóa đơn',
    default: null,
  })
  @IsString()
  @IsOptional()
  billId: number;

  /* Description */
  @Column({
    name: 'desc_detail',
    comment: 'mô tả chi tiết',
    type: 'text',
  })
  @IsString()
  desc_detail: string;

  /* Quantity */
  @Column({
    name: 'quantity',
    comment: 'Số lượng',
    default: null,
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  /* one price */
  @Column({
    name: 'price',
    comment: 'đơn giá',
    default: null,
    type: 'double',
  })
  @IsOptional()
  @IsString()
  price: string;

  /* type discount */
  @Column({
    name: 'type_discount',
    comment: 'kiểu giảm giá',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  typeDiscount: number;

  /* discount */
  @Column({
    name: 'discount',
    comment: 'giảm giá',
    default: null,
    type: 'double',
  })
  @IsOptional()
  @IsString()
  discount: string;

  /* attach */
  @Column({
    name: 'attach',
    comment: 'attach',
    default: null,
  })
  @IsOptional()
  @IsString()
  attach: string;

  /* sumery */
  @Column({
    name: 'sumery',
    comment: 'tổng phát sinh',
    type: 'double',
    default: 0,
  })
  @IsString()
  @IsOptional()
  sumery: string;

  /* paid */
  @Column({
    name: 'paid',
    comment: 'thanh toán',
    type: 'double',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  paid: string;

  /* from date */
  @Column({
    name: 'from_date',
    comment: 'from_date',
    default: null,
    type: 'date',
  })
  @Type()
  @IsOptional()
  @IsDate()
  from_date: Date;

  /* to date */
  @Column({
    name: 'to_date',
    comment: 'to_date',
    default: null,
    type: 'date',
  })
  @Type()
  @IsOptional()
  @IsDate()
  to_date: Date;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  projectId: number | null;

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
