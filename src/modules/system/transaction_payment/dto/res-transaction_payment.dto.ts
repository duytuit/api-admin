import { PartialType } from '@nestjs/swagger';
import { CreateTransactionPaymentDto } from './req-transaction_payment.dto';

export class UpdateTransactionPaymentDto extends PartialType(CreateTransactionPaymentDto) {}
