export class CreateTagDto {}
import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Tags } from '../entities/tag.entity';

export class CreateTagsDto extends OmitType(Tags, ['id'] as const) {}
export class UpdateTagsDto extends Tags {}
export class ReqTagsList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
