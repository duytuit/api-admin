import { PartialType } from '@nestjs/swagger';
import { CreateChapterDetailDto } from './req-chapter_detail.dto';

export class UpdateChapterDetailDto extends PartialType(
  CreateChapterDetailDto,
) {}
