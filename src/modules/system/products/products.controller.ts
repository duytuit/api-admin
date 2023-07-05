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
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  ReqProductList,
  UpdateProductDto,
} from './dto/req-product.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Product } from './entities/product.entity';
import { DataObj } from 'src/common/class/data-obj.class';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';

@Controller('system/products')
@Public()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addOrUpdate(createProductDto);
  }
  @Post('update')
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.addOrUpdate(updateProductDto);
  }
  @Get('list')
  @ApiPaginatedResponse(Product)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqProductList: ReqProductList,
  ) {
    const rs_list = await this.productsService.list(req, ReqProductList);
    return DataObj.create(rs_list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
