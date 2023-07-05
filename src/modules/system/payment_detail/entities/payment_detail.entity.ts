import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PaymentDetail extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

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

  /*  cycle name */
  @Column({
    name: 'cycle_name',
    comment: 'kỳ',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  cycleName: number;

  /* Receipt Id */
  @Column({
    name: 'receipt_id',
    comment: 'Id biên lai',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  receiptId: number;

  /* Debit Id */
  @Column({
    name: 'debit_id',
    comment: 'Id debit',
    default: null,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  debitId: number;

  /* Paid */
  @Column({
    name: 'paid',
    comment: 'paid',
    default: null,
    type: 'double',
  })
  @IsString()
  @Type()
  @IsOptional()
  paid: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

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
