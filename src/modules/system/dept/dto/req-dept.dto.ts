import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Dept } from '../entities/dept.entity';

export class ReqDeptListDto {
  /* Tên bộ phận */
  @IsOptional()
  @IsString()
  deptName?: string;

  /* Trạng thái */
  @IsOptional()
  @IsString()
  status?: string;
}

export class ReqAddDeptDto extends OmitType(Dept, ['deptId'] as const) {
  /* ID bộ phận cha mẹ */
  @Type()
  @IsNumber()
  parentId: number;
}

export class ReqUpdateDept extends Dept {
  /* ID bộ phận cha mẹ */
  @Type()
  @IsNumber()
  parentId: number;
}
