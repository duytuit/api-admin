import { PartialType } from '@nestjs/swagger';
import { CreateCampainDto } from './req-campain.dto';

export class UpdateCampainDto extends PartialType(CreateCampainDto) {}
