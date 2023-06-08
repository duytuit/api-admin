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
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqLogininforDto, ReqOperLogDto } from './dto/req-log.dto';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';
import { LogService } from './log.service';
@ApiTags('Quản lý nhật ký')
@Controller('monitor')
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly excelService: ExcelService,
  ) {}
  /* Hồ sơ hoạt động truy vấn Pagling */
  @Get('operlog/list')
  @RequiresPermissions('monitor:operlog:query')
  @ApiPaginatedResponse(OperLog)
  async operLogList(@Query(PaginationPipe) reqOperLogDto: ReqOperLogDto) {
    return await this.logService.operLogList(reqOperLogDto);
  }

  /* Xóa hồ sơ hoạt động */
  @Delete('operlog/clean')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: 'Quản lý nhật ký',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanOperLog() {
    await this.logService.cleanOperLog();
  }

  /* Xoá Nhật ký hoạt động */
  @Delete('operlog/:operLogIds')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: 'Quản lý nhật ký',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteOperLog(@Param('operLogIds') operLogIds: string) {
    const operLogArr = operLogIds.split(',');
    await this.logService.deleteOperLog(operLogArr);
  }

  /* Xuất Excel Nhật ký hoạt động */
  @Post('operlog/export')
  @RequiresPermissions('monitor:operlog:export')
  @Keep()
  @Log({
    title: 'Quản lý nhật ký',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async exportOperlog(@Body(PaginationPipe) reqOperLogDto: ReqOperLogDto) {
    const { rows } = await this.logService.operLogList(reqOperLogDto);
    const file = await this.excelService.export(OperLog, rows);
    return new StreamableFile(file);
  }

  /* Nhật ký đăng nhập truy vấn Pagling */
  @Get('logininfor/list')
  @ApiPaginatedResponse(Logininfor)
  @RequiresPermissions('monitor:logininfor:query')
  async logininforList(
    @Query(PaginationPipe) reqLogininforDto: ReqLogininforDto,
  ) {
    return await this.logService.logininforList(reqLogininforDto);
  }

  /* Đăng nhập vào Đăng nhập */
  @Delete('logininfor/clean')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: 'Ghi nhật ký',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanLogininfor() {
    await this.logService.cleanLogininfor();
  }

  /* Xoá Nhật ký hoạt động */
  @Delete('logininfor/:logininforIds')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: 'Ghi nhật ký',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteLogininfor(@Param('logininforIds') logininforIds: string) {
    const logininforArr = logininforIds.split(',');
    await this.logService.deleteLogininfor(logininforArr);
  }

  /* Xuất Excel Đăng nhập nhật ký */
  @Post('logininfor/export')
  @RequiresPermissions('monitor:logininfor:export')
  @Keep()
  @Log({
    title: 'Ghi nhật ký',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async exportLogininfor(
    @Body(PaginationPipe) reqLogininforDto: ReqLogininforDto,
  ) {
    const { rows } = await this.logService.logininforList(reqLogininforDto);
    const file = await this.excelService.export(Logininfor, rows);
    return new StreamableFile(file);
  }
}
