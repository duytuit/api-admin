import { PartialType } from '@nestjs/swagger';
import { CreateDebitDto } from './req-debit.dto';

export class UpdateDebitDto extends PartialType(CreateDebitDto) {}
