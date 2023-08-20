import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ database: 'infinite_cms' })
export class TestCm {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Bill ID */
  @Column({
    name: 'bill_id',
    comment: 'Mã hóa đơn',
    default: null,
  })
  @IsString()
  @IsOptional()
  billId: number;

  /* transaction Code*/
  @Column({
    name: 'transaction_code',
    comment: 'Mã giao dịch',
    default: null,
  })
  @IsString()
  @IsOptional()
  transactionCode: string;

  /*  paid */
  @Column({
    name: 'paid',
    comment: 'Thanh toán',
    default: null,
    type: 'double',
  })
  @Type()
  @IsOptional()
  paid: string;

  /* code */
  @Column({
    name: 'code',
    comment: 'code transaction',
    default: null,
  })
  @Type()
  @IsOptional()
  code: string;

  /* message*/
  @Column({
    name: 'messager',
    comment: 'Nội dung',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  messager: string;

  /* response */
  @Column({
    name: 'response',
    comment: 'response',
    default: null,
  })
  @IsString()
  @Type()
  @IsOptional()
  response: string;

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
