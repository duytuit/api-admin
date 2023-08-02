import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';

export class ParamsDto {
  /* Ngày bắt đầu */
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'params[beginTime]',
    default: moment().format('YYYY-MM-DD'),
  })
  beginTime?: string;

  /* Ngày kết thúc */
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'params[endTime]',
    default: moment().format('YYYY-MM-DD'),
  })
  endTime?: string;
}
export class ReqChangeStatusDto {
  /* Id danh mục*/
  @Type()
  @IsNumber()
  id: number;

  /* Trạng thái */
  @Type()
  @IsNumber()
  status: number;
}
