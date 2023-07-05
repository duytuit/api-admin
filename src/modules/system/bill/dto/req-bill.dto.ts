import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Bill } from '../entities/bill.entity';

export class CreateBillDto extends OmitType(Bill, ['id'] as const) {}
export class UpdateBillDto extends Bill {}
export class ReqBillList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
