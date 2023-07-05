import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { PaymentDetail } from '../entities/payment_detail.entity';

export class CreatePaymentDetailDto extends OmitType(PaymentDetail, [
  'id',
] as const) {}
export class UpdatePaymentDetailDto extends PaymentDetail {}
export class ReqPaymentDetailList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
