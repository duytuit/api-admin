import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './req-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
