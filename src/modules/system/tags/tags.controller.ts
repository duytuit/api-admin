import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import {
  CreateTagDto,
  ReqTagGroupTag,
  ReqTagList,
  UpdateTagDto,
} from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/tag')
@Public()
export class TagsController {
  constructor(private readonly TagService: TagsService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateTagDto) {
    return this.TagService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateTagDto) {
    return this.TagService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Tag)
  async findAll(@Req() req, @Query(PaginationPipe) ReqTagList: ReqTagList) {
    return await this.TagService.list(req, ReqTagList);
  }
  @Get('getTagGroupTag')
  @ApiPaginatedResponse(Tag)
  async getTagGroupTag(
    @Req() req,
    @Query(PaginationPipe) ReqTagGroupTag: ReqTagGroupTag,
  ) {
    return await this.TagService.getTagGroupTag(req, ReqTagGroupTag);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.TagService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    return this.TagService.remove(body);
  }
}
