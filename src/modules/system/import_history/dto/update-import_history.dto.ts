import { PartialType } from '@nestjs/swagger';
import { CreateImportHistoryDto } from './create-import_history.dto';

export class UpdateImportHistoryDto extends PartialType(CreateImportHistoryDto) {}
