import { PartialType } from '@nestjs/swagger';
import { CreateCustomerCareDto } from './create-customer_care.dto';

export class UpdateCustomerCareDto extends PartialType(CreateCustomerCareDto) {}
