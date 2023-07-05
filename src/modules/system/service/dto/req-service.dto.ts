import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Service } from '../entities/service.entity';

export class CreateServiceDto extends OmitType(Service, ['id'] as const) {}
export class UpdateServiceDto extends Service {}
export class ReqServiceList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
