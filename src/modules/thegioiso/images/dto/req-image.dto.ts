import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Images } from '../entities/image.entity';

export class CreateImageDto extends OmitType(Images, ['id'] as const) {}
export class UpdateImageDto extends Images {}
export class ReqImageList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
