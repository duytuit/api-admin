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
import { DataScopeSql } from 'src/common/decorators/data-scope-sql.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { TreeDataDto } from 'src/common/dto/tree-data.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { DeptService } from './dept.service';
import {
  ReqAddDeptDto,
  ReqDeptListDto,
  ReqUpdateDept,
} from './dto/req-dept.dto';
import { ResRoleDeptTreeselectDto } from './dto/res-dept.dto';

@ApiTags('Quản lý bộ phận')
@Controller('system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  /* Bộ phận */
  @RepeatSubmit()
  @Post()
  @RequiresPermissions('system:dept:add')
  @Log({
    title: 'Quản lý bộ phận',
    businessType: BusinessTypeEnum.insert,
  })
  async add(
    @Body() reqAddDeptDto: ReqAddDeptDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddDeptDto.createBy = reqAddDeptDto.updateBy = userName;
    await this.deptService.addOrUpdate(reqAddDeptDto);
  }

  /* Danh sách bộ phận */
  @Get('list')
  @RequiresPermissions('system:dept:query')
  @ApiDataResponse(typeEnum.objectArr, ReqAddDeptDto)
  async list(@Query() reqDeptListDto: ReqDeptListDto) {
    const deptArr = await this.deptService.list(reqDeptListDto);
    return DataObj.create(deptArr);
  }

  /* Nhận cấu trúc cây của bộ phận */
  @Get('treeselect')
  @ApiDataResponse(typeEnum.objectArr, TreeDataDto)
  async treeselect(@DataScopeSql() dataScopeSql: string) {
    const deptTree = await this.deptService.treeselectByOrg(dataScopeSql);
    return DataObj.create(deptTree);
  }

  /* Bộ phận yêu cầu thông qua ID */
  @Get(':deptId')
  @RequiresPermissions('system:dept:query')
  @ApiDataResponse(typeEnum.object, ReqAddDeptDto)
  async one(@Param('deptId') deptId: number) {
    const dept = await this.deptService.findRawById(deptId);
    return DataObj.create(dept);
  }

  /* Truy vấn danh sách các cửa bên ngoài ngoài */
  @Get('list/exclude/:deptId')
  @ApiDataResponse(typeEnum.objectArr, ReqAddDeptDto)
  async outList(@Param('deptId') deptId: number) {
    const deptArr = await this.deptService.outList(deptId);
    return DataObj.create(deptArr);
  }

  /* Bộ phận SửA */
  @RepeatSubmit()
  @Put()
  @RequiresPermissions('system:dept:edit')
  @Log({
    title: 'Quản lý bộ phận',
    businessType: BusinessTypeEnum.update,
  })
  async update(
    @Body() reqUpdateDept: ReqUpdateDept,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateDept.updateBy = userName;
    await this.deptService.addOrUpdate(reqUpdateDept);
  }

  /* Bộ phận Xoá */
  @Delete(':deptId')
  @RequiresPermissions('system:dept:remove')
  @Log({
    title: 'Quản lý bộ phận',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(
    @Param('deptId') deptId: string,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const childs = await this.deptService.findChildsByParentId(deptId);
    if (childs && childs.length)
      throw new ApiException('Vẫn còn các bộ phận khác thuộc bộ và không thể là Xoá');
    await this.deptService.delete(deptId, userName);
  }

  /* Kiểm tra quyền dữ liệu của ký tự thông qua ID ký tự */
  @Get('roleDeptTreeselect/:roleId')
  @ApiDataResponse(typeEnum.object, ResRoleDeptTreeselectDto)
  async roleDeptTreeselect(
    @Param('roleId') roleId: number,
  ): Promise<ResRoleDeptTreeselectDto> {
    const depts = await this.deptService.treeselect();
    const checkedKeys = await this.deptService.getCheckedKeys(roleId);
    return {
      depts,
      checkedKeys,
    };
  }
}
