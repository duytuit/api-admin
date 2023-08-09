import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto extends OmitType(Tag, ['id'] as const) {}
export class UpdateTagDto extends Tag {}
export class ReqTagGroupTag {
  /*  Dự án */
  @Type()
  @IsNumber()
  projectId: number;

  /* Loại */
  @Type()
  @IsNumber()
  type: number;
}
export class ReqTagList extends PaginationDto {
  /* ID */
  @IsOptional()
  @IsString()
  id: string;
  /* Tag */
  @IsOptional()
  @IsString()
  tag: string;

  /* Tag slug */
  @IsOptional()
  @IsString()
  tagSlug: string;

  @IsNumber()
  @Type()
  projectId: number;

  @IsNumber()
  @Type()
  @IsOptional()
  postId: number;
}
