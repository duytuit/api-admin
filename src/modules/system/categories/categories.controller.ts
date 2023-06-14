import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  ReqCategoryList,
  UpdateCategoryDto,
} from './dto/req-category.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Category } from './entities/category.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { DataObj } from 'src/common/class/data-obj.class';

@Controller('system/categories')
@Public()
export class CategoriesController {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addOrUpdate(createCategoryDto);
  }
  @Post('update')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.addOrUpdate(updateCategoryDto);
  }
  @Get('list')
  @ApiPaginatedResponse(Category)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) reqCategoryList: ReqCategoryList,
  ) {
    const rs_list = await this.categoriesService.list(req, reqCategoryList);
    return DataObj.create(rs_list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
