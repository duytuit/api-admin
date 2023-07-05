import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Receipt } from '../entities/receipt.entity';

export class CreateReceiptDto extends OmitType(Receipt, ['id'] as const) {}
export class UpdateReceiptDto extends Receipt {}
export class ReqReceiptList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
