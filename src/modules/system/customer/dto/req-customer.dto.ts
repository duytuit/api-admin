import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id'] as const) {}
export class UpdateCustomerDto extends Customer {}
export class ReqCustomerList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
