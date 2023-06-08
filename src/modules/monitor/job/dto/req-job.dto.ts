import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Job } from '../entities/job.entity';

/* Danh sách nhiệm vụ của họ */
export class ReqAddJob extends OmitType(Job, ['jobId'] as const) {}

/* Danh sách nhiệm vụ truy vấn Pagling */
export class ReqJobListDto extends PaginationDto {
  /* Tên nhiệm vụ */
  @IsOptional()
  @IsString()
  jobName?: string;

  /* Tên nhóm nhiệm vụ */
  @IsOptional()
  @IsString()
  jobGroup?: string;

  /* Nhiệm vụ Trạng thái */
  @IsOptional()
  @IsString()
  status?: string;
}

/* Cập nhật nhiệm vụ Trạng thái */
export class ReqChangStatusDto {
  /* Id nhiệm vụ */
  @Type()
  @IsNumber()
  jobId: number;

  /* Trạng thái */
  @Type()
  @IsString()
  status: string;
}

/* Nhật ký lập lịch trình nhiệm vụ truy vấn Pagling */
export class ReqJobLogList extends PaginationDto {
  /* Tên nhiệm vụ */
  @IsOptional()
  @IsString()
  jobName?: string;

  /* Tên nhóm nhiệm vụ */
  @IsOptional()
  @IsString()
  jobGroup?: string;

  /* thực hiện Trạng thái */
  @IsOptional()
  @IsString()
  status?: string;

  /* thời gian thực hiện */
  @IsOptional()
  @IsObject()
  params?: ParamsDto;
}

/* Thực hiện một nhiệm vụ */
export class ReqJobRunDto {
  /* Tập đoàn */
  @IsString()
  jobGroup: string;

  /* Id nhiệm vụ */
  @IsNumber()
  jobId: number;
}
