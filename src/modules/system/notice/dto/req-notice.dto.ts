import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Notice } from '../entities/notice.entity';

export class ReqAddNoticeDto extends OmitType(Notice, ['noticeId'] as const) {}

export class ReqNoeiceList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  noticeTitle: string;

  /* người sáng lập */
  @IsOptional()
  @IsString()
  createBy: string;

  /* Loại thông báo */
  @IsOptional()
  @IsString()
  noticeType: string;
}
