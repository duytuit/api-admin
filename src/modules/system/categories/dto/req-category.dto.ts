import { OmitType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto extends OmitType(Category, ['id'] as const) {}
export class UpdateCategoryDto extends Category {}
export class ReqCategoryList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
  @IsNumber()
  @Type()
  projectId: number;
}
