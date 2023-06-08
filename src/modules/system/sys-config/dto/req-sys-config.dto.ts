import { OmitType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { SysConfig } from '../entities/sys-config.entity';

/* Thêm */
export class ReqAddConfigDto extends OmitType(SysConfig, [
  'configId',
] as const) {}

/* Truy vấn phân trang */
export class ReqConfigListDto extends PaginationDto {
  /* Tên tham số */
  @IsOptional()
  @IsString()
  configName?: string;

  /* Tên khóa tham số */
  @IsOptional()
  @IsString()
  configKey?: string;

  /* Tham số */
  @IsOptional()
  @IsString()
  configType?: string;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}
