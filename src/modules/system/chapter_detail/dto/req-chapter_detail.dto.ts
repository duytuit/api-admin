import { OmitType } from '@nestjs/swagger';
import { ChapterDetail } from '../entities/chapter_detail.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class CreateChapterDetailDto extends OmitType(ChapterDetail, [
  'id',
] as const) {}
export class UpdateChapterDetailDto extends ChapterDetail {}
export class ReqChapterDetailList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
