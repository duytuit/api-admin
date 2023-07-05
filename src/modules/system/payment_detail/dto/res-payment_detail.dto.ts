import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDetailDto } from './req-payment_detail.dto';

export class UpdatePaymentDetailDto extends PartialType(
  CreatePaymentDetailDto,
) {}
