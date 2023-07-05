import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './req-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
