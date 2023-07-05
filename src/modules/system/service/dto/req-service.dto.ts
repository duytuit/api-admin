import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Service } from '../entities/service.entity';
import { Type } from 'class-transformer';

export class CreateServiceDto extends OmitType(Service, ['id'] as const) {}
export class UpdateServiceDto extends Service {}
export class ReqServiceList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
  @IsNumber()
  @Type()
  projectId: number;
}
