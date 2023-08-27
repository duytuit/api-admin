import { PartialType } from '@nestjs/swagger';
import { CreateFinanceCustomerDto } from './req-finance_customer.dto';

export class UpdateFinanceCustomerDto extends PartialType(
  CreateFinanceCustomerDto,
) {}
