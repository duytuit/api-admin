import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './req-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
