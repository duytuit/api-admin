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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { DictService } from './dict.service';
import {
  ReqAddDictDataDto,
  ReqAddDictTypeDto,
  ReqDictDataListDto,
  ReqDictTypeListDto,
  ReqUpdateDictDataDto,
} from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';

@ApiTags('Quản lý từ điển')
@ApiBearerAuth()
@Controller('system')
export class DictController {
  constructor(
    private readonly dictService: DictService,
    private readonly excelService: ExcelService,
  ) {}

  /* Thêm Từ điển */
  @RepeatSubmit()
  @Post('dict/type')
  @RequiresPermissions('system:dict:add')
  async addType(
    @Body() reqAddDictTypeDto: ReqAddDictTypeDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddDictTypeDto.createBy = reqAddDictTypeDto.updateBy = userName;
    await this.dictService.addOrUpdateType(reqAddDictTypeDto);
  }

  /* Danh sách loại từ điển truy vấn Pagling */
  @Get('dict/type/list')
  @RequiresPermissions('system:dict:query')
  @ApiPaginatedResponse(DictType)
  async typeList(
    @Query(PaginationPipe) reqDictTypeListDto: ReqDictTypeListDto,
  ): Promise<PaginatedDto<DictType>> {
    return this.dictService.typeList(reqDictTypeListDto);
  }

  /* Làm mới Bộ nhớ cache */
  @Delete('dict/type/refreshCache')
  async refreshCache() {
    await this.dictService.refreshCache();
  }

  /* Xoá Từ điển */
  @Delete('dict/type/:typeIds')
  @RequiresPermissions('system:dict:remove')
  async deleteDictType(@Param('typeIds') typeIds: string) {
    await this.dictService.deleteByDictIdArr(typeIds.split(','));
  }

  /* vượt qua id Loại từ điển truy vấn */
  @Get('/dict/type/:typeId')
  @RequiresPermissions('system:dict:query')
  @ApiDataResponse(typeEnum.object, DictType)
  async oneDictType(
    @Param('typeId') typeId: number,
  ): Promise<DataObj<DictType>> {
    const dictType = await this.dictService.findDictTypeById(typeId);
    return DataObj.create(dictType);
  }

  /* Chỉnh sửa loại từ điển */
  @RepeatSubmit()
  @Put('dict/type')
  @RequiresPermissions('system:dict:edit')
  async updateDictType(
    @Body() dictType: DictType,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    dictType.updateBy = userName;
    await this.dictService.addOrUpdateType(dictType);
  }

  /* Kiểm tra dữ liệu từ điển thông qua loại từ điển */
  @Get('dict/data/type/:dictType')
  async dictDataByDictType(
    @Param('dictType') dictType: string,
  ): Promise<DataObj<DictData[]>> {
    const dictDataArr = await this.dictService.getDictDataByDictType(dictType);
    return DataObj.create(dictDataArr);
  }

  /* Danh sách dữ liệu từ điển truy vấn Pagling */
  @Get('dict/data/list')
  @ApiPaginatedResponse(DictData)
  async dictDataList(
    @Query(PaginationPipe) reqDictDataListDto: ReqDictDataListDto,
  ) {
    return await this.dictService.dictDataList(reqDictDataListDto);
  }

  /* Thêm Dữ liệu từ điển */
  @RepeatSubmit()
  @Post('dict/data')
  async addDictData(
    @Body() reqAddDictDataDto: ReqAddDictDataDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const dictData = await this.dictService.getDictDataByTypeOrValue(
      reqAddDictDataDto.dictType,
      reqAddDictDataDto.dictValue,
    );
    if (dictData) throw new ApiException('Khóa dữ liệu này đã tồn tại, vui lòng thay thế');
    reqAddDictDataDto.createBy = reqAddDictDataDto.updateBy = userName;
    await this.dictService.addOrUpdateDictData(reqAddDictDataDto);
  }

  /* vượt qua dictCode Nhận dữ liệu từ điển */
  @Get('dict/data/:dictCode')
  @ApiDataResponse(typeEnum.object, ReqUpdateDictDataDto)
  async oneDictData(@Param('dictCode') dictCode: number) {
    const dictData = await this.dictService.findDictDataById(dictCode);
    return DataObj.create(dictData);
  }

  /* Chỉnh sửa dữ liệu từ điển */
  @RepeatSubmit()
  @Put('dict/data')
  async updateDictData(
    @Body() reqUpdateDictDataDto: ReqUpdateDictDataDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateDictDataDto.updateBy = userName;
    await this.dictService.addOrUpdateDictData(reqUpdateDictDataDto);
  }

  /* Xoá Dữ liệu từ điển */
  @Delete('dict/data/:dictDatas')
  async deleteDictData(@Param('dictDatas') dictDatas: string) {
    await this.dictService.deleteDictDataByids(dictDatas.split(','));
  }

  /* Xuất Excel từ điển */
  @RepeatSubmit()
  @Post('dict/type/export')
  @RequiresPermissions('system:dict:export')
  @Keep()
  @ApiPaginatedResponse(DictType)
  async export(@Body(PaginationPipe) reqDictTypeListDto: ReqDictTypeListDto) {
    const { rows } = await this.dictService.typeList(reqDictTypeListDto);
    const file = await this.excelService.export(DictType, rows);
    return new StreamableFile(file);
  }

  /* Xuất Excel từ điển */
  @RepeatSubmit()
  @Post('dict/data/export')
  @Keep()
  @ApiPaginatedResponse(DictType)
  async exportData(
    @Body(PaginationPipe) reqDictDataListDto: ReqDictDataListDto,
  ) {
    const { rows } = await this.dictService.dictDataList(reqDictDataListDto);
    const file = await this.excelService.export(DictData, rows);
    return new StreamableFile(file);
  }
}
