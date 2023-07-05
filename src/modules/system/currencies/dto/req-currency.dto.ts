import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Currency } from '../entities/currency.entity';

export class CreateCurrencyDto extends OmitType(Currency, ['id'] as const) {}
export class UpdateCurrencyDto extends Currency {}
export class ReqCurrencyList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
