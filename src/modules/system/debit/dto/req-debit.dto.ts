import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Debit } from '../entities/debit.entity';

export class CreateDebitDto extends OmitType(Debit, ['id'] as const) {}
export class UpdateDebitDto extends Debit {}
export class ReqDebitList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
