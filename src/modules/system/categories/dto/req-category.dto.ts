import { OmitType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto extends OmitType(Category, ['id'] as const) {}
export class UpdateCategoryDto extends Category {}

export class ReqCategoryList extends PaginationDto {
  /* ID */
  @IsOptional()
  @IsString()
  id: string | null;
  /* Tên */
  @IsOptional()
  @IsString()
  name: string;

  /* Thuộc tính */
  @IsOptional()
  @IsString()
  option: string;

  @IsNumber()
  @Type()
  projectId: number;

  @IsNumber()
  @Type()
  type: number;
}
