import { PartialType } from '@nestjs/swagger';
import { CreateReceiptDto } from './req-receipt.dto';

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {}
