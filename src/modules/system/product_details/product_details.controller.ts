import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductDetailsService } from './product_details.service';
import {
  CreateProductDetailDto,
  UpdateProductDetailDto,
} from './dto/req-product_detail.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/product-details')
@Public()
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Post('create')
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailsService.addOrUpdate(createProductDetailDto);
  }
  @Post('update')
  update(@Body() updateProductDetailDto: UpdateProductDetailDto) {
    return this.productDetailsService.addOrUpdate(updateProductDetailDto);
  }
  @Get()
  findAll() {
    return this.productDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailsService.remove(+id);
  }
}
