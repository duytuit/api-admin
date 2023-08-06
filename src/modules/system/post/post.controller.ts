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
  Req,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { ApiException } from 'src/common/exceptions/api.exception';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import {
  ReqAddPostDto,
  ReqPostListDto,
  UpdatePostDto,
} from './dto/req-post.dto';
import { PostService } from './post.service';
import { Post as SysPost } from './entities/post.entity';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { DataObj } from 'src/common/class/data-obj.class';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@ApiTags('Quản lý bài')
@Controller('system/post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly excelService: ExcelService,
  ) {}

  /* Thêm岗位 */
  @RepeatSubmit()
  @Post()
  @RequiresPermissions('system:post:add')
  @Log({
    title: 'Quản lý bài',
    businessType: BusinessTypeEnum.insert,
  })
  async add(
    @Body() reqAddPostDto: ReqAddPostDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const post = await this.postService.findByPostCode(reqAddPostDto.postCode);
    if (post)
      throw new ApiException('Mã bài đăng đã tồn tại, vui lòng thay thế');
    reqAddPostDto.createBy = reqAddPostDto.updateBy = userName;
    await this.postService.addOrUpdate(reqAddPostDto);
  }

  /* Danh sách bài đăng truy vấn Pagling */
  @Get('v1/list')
  @RequiresPermissions('system:post:query')
  @ApiPaginatedResponse(SysPost)
  async list(@Query(PaginationPipe) reqPostListDto: ReqPostListDto) {
    console.log('sdfsdfds');

    // return this.postService.list(reqPostListDto);
  }

  /* Kiểm tra bài viết qua ID */
  @Get(':postId')
  @RequiresPermissions('system:post:query')
  @ApiDataResponse(typeEnum.object, SysPost)
  async one(@Param('postId') postId: number) {
    const post = await this.postService.findById(postId);
    return DataObj.create(post);
  }

  /* Sửa bài */
  @RepeatSubmit()
  @Put()
  @RequiresPermissions('system:post:edit')
  @Log({
    title: 'Quản lý bài',
    businessType: BusinessTypeEnum.update,
  })
  async update(
    @Body() post: SysPost,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    post.updateBy = userName;
    await this.postService.addOrUpdate(post);
  }

  /* Bài đăng Xoá */
  @Delete(':postIds')
  @RequiresPermissions('system:post:remove')
  @Log({
    title: 'Quản lý bài',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('postIds') postIds: string) {
    await this.postService.delete(postIds.split(','));
  }

  /* Xuất Excel bưu kiện */
  @RepeatSubmit()
  @Post('export')
  @RequiresPermissions('system:post:export')
  @Keep()
  @Log({
    title: 'Quản lý bài',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async export(@Body(PaginationPipe) reqPostListDto: ReqPostListDto) {
    const { rows } = await this.postService.list(reqPostListDto);
    const file = await this.excelService.export(SysPost, rows);
    return new StreamableFile(file);
  }

  // ==========================v2================================
  @Post('create')
  create(@Body() ReqAddPostDto: ReqAddPostDto) {
    return this.postService.addOrUpdate(ReqAddPostDto);
  }
  @Post('update')
  update_v2(@Body() UpdatePostDto: UpdatePostDto) {
    return this.postService.addOrUpdate(UpdatePostDto);
  }
  @Get('v2/list')
  @ApiPaginatedResponse(SysPost)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqPostListDto: ReqPostListDto,
  ) {
    return await this.postService.list_v2(req, ReqPostListDto);
  }
  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.postService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    // console.log(body);
    return this.postService.remove(body);
  }
}
