/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import {
  ReqAddJob,
  ReqChangStatusDto,
  ReqJobListDto,
  ReqJobLogList,
  ReqJobRunDto,
} from './dto/req-job.dto';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
import { JobService } from './job.service';

@ApiTags('Quản lý nhiệm vụ')
@Controller('monitor')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly excelService: ExcelService,
  ) {}

  /* Nhiệm vụ của họ */
  @RepeatSubmit()
  @Post('job')
  @RequiresPermissions('monitor:job:add')
  async addJob(
    @Body() reqAddJob: ReqAddJob,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddJob.createBy = reqAddJob.updateBy = userName;
    await this.jobService.addJob(reqAddJob);
  }

  /* Danh sách nhiệm vụ truy vấn Pagling */
  @Get('job/list')
  @RequiresPermissions('monitor:job:query')
  @ApiPaginatedResponse(Job)
  async jobList(@Query(PaginationPipe) reqJobListDto: ReqJobListDto) {
    return this.jobService.jobList(reqJobListDto);
  }

  /* Kiểm tra tác vụ thông qua ID */
  @Get('job/:jobId')
  @RequiresPermissions('monitor:job:query')
  @ApiDataResponse(typeEnum.object, Job)
  async oneJob(@Param('jobId') jobId: number) {
    const job = await this.jobService.oneJob(jobId);
    return DataObj.create(job);
  }

  /* Chỉnh sửa nhiệm vụ */
  @RepeatSubmit()
  @Put('job')
  @RequiresPermissions('monitor:job:edit')
  async updataJob(
    @Body() job: Job,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    job.updateBy = userName;
    await this.jobService.updataJob(job);
  }

  /* Hành hình */
  @RepeatSubmit()
  @Put('job/run')
  @RequiresPermissions('monitor:job:edit')
  async run(@Body() reqJobRunDto: ReqJobRunDto) {
    const job = await this.jobService.oneJob(reqJobRunDto.jobId);
    await this.jobService.once(job);
  }

  /* Nhiệm vụ Xoá */
  @Delete('job/:jobIds')
  @RequiresPermissions('monitor:job:remove')
  async deleteJob(@Param('jobIds') jobIds: string) {
    await this.jobService.deleteJob(jobIds.split(','));
  }

  /* Thay đổi nhiệm vụ Trạng thái */
  @RepeatSubmit()
  @Put('job/changeStatus')
  @RequiresPermissions('monitor:job:changeStatus')
  async changeStatus(
    @Body() reqChangStatusDto: ReqChangStatusDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    await this.jobService.changeStatus(reqChangStatusDto, userName);
  }

  /* Xuất ExcelNhiệm vụ thời gian */
  @RepeatSubmit()
  @Post('job/export')
  @RequiresPermissions('monitor:job:export')
  @Keep()
  async exportJob(@Body(PaginationPipe) reqJobListDto: ReqJobListDto) {
    const { rows } = await this.jobService.jobList(reqJobListDto);
    const file = await this.excelService.export(Job, rows);
    return new StreamableFile(file);
  }

  /* Nhật ký lập lịch trình nhiệm vụ truy vấn Pagling */
  @Get('jobLog/list')
  @ApiPaginatedResponse(JobLog)
  async jobLogList(@Query(PaginationPipe) reqJobLogList: ReqJobLogList) {
    return await this.jobService.jobLogList(reqJobLogList);
  }

  /* Xóa nhật ký công văn tác vụ */
  @Delete('jobLog/clean')
  async cleanJobLog() {
    await this.jobService.cleanJobLog();
  }

  /* Nhật ký lập lịch tác vụ Xoá */
  @Delete('jobLog/:jobLogIds')
  async deleteJogLog(@Param('jobLogIds') jobLogIds: string) {
    await this.jobService.deleteJogLog(jobLogIds.split(','));
  }

  /* Xuất Nhật ký tác vụ thời gian excel */
  @RepeatSubmit()
  @Post('jobLog/export')
  @Keep()
  async exportJobLog(@Body(PaginationPipe) reqJobLogList: ReqJobLogList) {
    const { rows } = await this.jobService.jobLogList(reqJobLogList);
    const file = await this.excelService.export(JobLog, rows);
    return new StreamableFile(file);
  }
}
