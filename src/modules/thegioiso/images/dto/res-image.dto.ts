import { PartialType } from '@nestjs/swagger';
import { CreateImageDto } from './req-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
