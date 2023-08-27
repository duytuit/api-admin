import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { FinanceCustomer } from '../entities/finance_customer.entity';

export class CreateFinanceCustomerDto extends OmitType(FinanceCustomer, [
  'id',
] as const) {}
export class UpdateFinanceCustomerDto extends FinanceCustomer {}
export class ReqFinanceCustomerList extends PaginationDto {
  /* Tên khách hàng */
  @IsOptional()
  @IsString()
  customer_name: string;
}
