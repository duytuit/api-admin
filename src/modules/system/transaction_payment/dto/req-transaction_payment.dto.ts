import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { TransactionPayment } from '../entities/transaction_payment.entity';

export class CreateTransactionPaymentDto extends OmitType(TransactionPayment, [
  'id',
] as const) {}
export class UpdateTransactionPaymentDto extends TransactionPayment {}
export class ReqTransactionPaymentList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
