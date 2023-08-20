import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Categories } from '../entities/category.entity';

export class CreateCategoryDto extends OmitType(Categories, ['id'] as const) {}
export class UpdateCategoryDto extends Categories {}
export class ReqCategoryList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
