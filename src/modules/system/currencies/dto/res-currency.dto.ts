import { PartialType } from '@nestjs/swagger';
import { CreateCurrencyDto } from './req-currency.dto';

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {}
