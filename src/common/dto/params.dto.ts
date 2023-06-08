import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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
