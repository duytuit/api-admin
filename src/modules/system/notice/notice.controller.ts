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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ReqAddNoticeDto, ReqNoeiceList } from './dto/req-notice.dto';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { LogDebug } from 'src/common/debugLog';

@ApiTags('sự thông báo')
@Controller('system/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  /* Thêm公告 */
  @RepeatSubmit()
  @Post()
  @RequiresPermissions('system:notice:add')
  @Log({
    title: 'sự thông báo',
    businessType: BusinessTypeEnum.insert,
  })
  async add(
    @Body() reqAddNoticeDto: ReqAddNoticeDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddNoticeDto.createBy = reqAddNoticeDto.updateBy = userName;
    //LogDebug._info(JSON.stringify(reqAddNoticeDto));
    await this.noticeService.addOrUpdate(reqAddNoticeDto);
  }

  /* 分页查询公告 */
  @Get('list')
  @RequiresPermissions('system:notice:query')
  @ApiPaginatedResponse(Notice)
  async list(@Query(PaginationPipe) reqNoeiceList: ReqNoeiceList) {
    return this.noticeService.list(reqNoeiceList);
  }

  /* 通过id查询公告 */
  @Get(':noticeId')
  @RequiresPermissions('system:notice:query')
  @ApiDataResponse(typeEnum.object, Notice)
  async one(@Param('noticeId') noticeId: number) {
    const notice = await this.noticeService.findById(noticeId);
    return DataObj.create(notice);
  }

  /* 更新公告 */
  @RepeatSubmit()
  @Put()
  @RequiresPermissions('system:notice:edit')
  @Log({
    title: 'sự thông báo',
    businessType: BusinessTypeEnum.update,
  })
  async update(
    @Body() notice: Notice,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    notice.updateBy = userName;
    //LogDebug._info(userName);
    await this.noticeService.addOrUpdate(notice);
  }

  /* Xoá公告 */
  @Delete(':noticeIds')
  @RequiresPermissions('system:notice:remove')
  @Log({
    title: 'sự thông báo',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('noticeIds') noticeIds: string) {
    await this.noticeService.delete(noticeIds.split(','));
  }
}
