import { PartialType } from '@nestjs/swagger';
import { CreateBillDto } from './req-bill.dto';

export class UpdateBillDto extends PartialType(CreateBillDto) {}
