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
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Controller('system/product')
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
    return await this.productsService.list(req, ReqProductList);
  }
  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.productsService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    // console.log(body);
    return this.productsService.remove(body);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
