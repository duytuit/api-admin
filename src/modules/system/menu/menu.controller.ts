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
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { TreeDataDto } from 'src/common/dto/tree-data.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import {
  ReqAddMenuDto,
  ReqMenuListDto,
  ReqUpdateMenu,
} from './dto/req-menu.dto';
import { ResRoleMenuTreeselectDto } from './dto/res-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('Quản lý thực đơn')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  /* Thêm thực đơn */
  @RepeatSubmit()
  @Post()
  @RequiresPermissions('system:menu:add')
  async add(
    @Body() reqAddMenuDto: ReqAddMenuDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddMenuDto.createBy = reqAddMenuDto.updateBy = userName;
    await this.menuService.addOrUpdate(reqAddMenuDto);
  }

  /* Danh sách menu */
  @Get('list')
  @RequiresPermissions('system:menu:query')
  @ApiDataResponse(typeEnum.objectArr, ReqAddMenuDto)
  async list(@Query() reqMenuListDto: ReqMenuListDto) {
    const menutArr = await this.menuService.list(reqMenuListDto);
    return DataObj.create(menutArr);
  }

  /* Cấu trúc cây menu truy vấn */
  @Get('treeselect')
  @ApiDataResponse(typeEnum.objectArr, TreeDataDto)
  async treeselect() {
    const menuTree = await this.menuService.treeselect();
    return DataObj.create(menuTree);
  }

  /* vượt qua id Danh sách truy vấn */
  @Get(':menuId')
  @RequiresPermissions('system:menu:query')
  @ApiDataResponse(typeEnum.object, ReqAddMenuDto)
  async one(@Param('menuId') menuId: number) {
    const menu = await this.menuService.findRawById(menuId);
    return DataObj.create(menu);
  }

  /* Truy vấn danh sách các bữa ăn cho chính bạn (bao gồm cả phân loại phụ) */
  @Get('list/exclude/:menuId')
  @ApiDataResponse(typeEnum.objectArr, ReqAddMenuDto)
  async outList(@Param('menuId') menuId: number) {
    const menuArr = await this.menuService.outList(menuId);
    return DataObj.create(menuArr);
  }

  /* Sửa thực đơn */
  @RepeatSubmit()
  @Put()
  @RequiresPermissions('system:menu:edit')
  async update(
    @Body() reqUpdateMenu: ReqUpdateMenu,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateMenu.updateBy = userName;
    await this.menuService.addOrUpdate(reqUpdateMenu);
  }

  /* Xoá thực đơn */
  @Delete(':menuId')
  @RequiresPermissions('system:menu:remove')
  async delete(@Param('menuId') menuId: number) {
    const childs = await this.menuService.findChildsByParentId(menuId);
    if (childs && childs.length)
      throw new ApiException('Vẫn còn các menu khác trong menu, không thể Xoá');
    await this.menuService.delete(menuId);
  }

  /* Thông qua vai trò Id Kiểm tra quyền của menu */
  @Get('roleMenuTreeselect/:roleId')
  @ApiDataResponse(typeEnum.object, ResRoleMenuTreeselectDto)
  async roleMenuTreeselect(
    @Param('roleId') roleId: number,
  ): Promise<ResRoleMenuTreeselectDto> {
    const menus = await this.menuService.treeselect();
    const checkedKeys = await this.menuService.getCheckedKeys(roleId);
    return {
      menus,
      checkedKeys,
    };
  }
}
