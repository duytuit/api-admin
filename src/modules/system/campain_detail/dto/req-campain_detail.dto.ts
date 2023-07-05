import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { CampainDetail } from '../entities/campain_detail.entity';

export class CreateCampainDetailDto extends OmitType(CampainDetail, [
  'id',
] as const) {}
export class UpdateCampainDetailDto extends CampainDetail {}
export class ReqCampainDetailList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
