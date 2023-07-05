import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Campain } from '../entities/campain.entity';

export class CreateCampainDto extends OmitType(Campain, ['id'] as const) {}
export class UpdateCampainDto extends Campain {}
export class ReqCampainList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
