import { PartialType } from '@nestjs/swagger';
import { CreateCampainDetailDto } from './req-campain_detail.dto';

export class UpdateCampainDetailDto extends PartialType(
  CreateCampainDetailDto,
) {}
