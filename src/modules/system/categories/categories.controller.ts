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
import { COUNTRIES } from 'src/common/utils/country';

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
    return await this.categoriesService.list(req, reqCategoryList);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Get('update/country')
  async findCountry() {
    for (const item of COUNTRIES) {
      const cat = new Category();
      cat.name = item.title;
      cat.slug = item.value;
      cat.projectId = 2;
      cat.type = 1;
      const sdfdsf = await this.categoriesService.addOrUpdate(cat);
    }
    return DataObj.create({ abc: '123' });
  }
}
